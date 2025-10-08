import { useState } from 'react'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const API_URL = 'http://localhost:3001/todos'

// Buat QueryClient di sini
const queryClient = new QueryClient()

// Fetch todos
const fetchTodos = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  return response.json()
}

// Create todo
const createTodo = async (newTodo) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  })
  if (!response.ok) {
    throw new Error('Failed to create todo')
  }
  return response.json()
}

// Update todo
const updateTodo = async (todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to update todo')
  }
  return response.json()
}

// Delete todo
const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
  return response.json()
}

function TodoApp() {
  const [title, setTitle] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const queryClient = useQueryClient()

  // useQuery untuk fetch data
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  // useMutation untuk create todo
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setTitle('')
    },
  })

  // useMutation untuk update todo
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setEditingTodo(null)
    },
  })

  // useMutation untuk delete todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    if (editingTodo) {
      // Update existing todo
      updateMutation.mutate({
        ...editingTodo,
        title: title,
      })
    } else {
      // Create new todo
      createMutation.mutate({
        title: title,
        completed: false,
      })
    }
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setTitle(todo.title)
  }

  const handleCancelEdit = () => {
    setEditingTodo(null)
    setTitle('')
  }

  const handleToggleComplete = (todo) => {
    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus todo ini?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>
  }

  return (
    <div className="container">
      <h1>Todo List dengan React Query</h1>

      {/* Form Create/Update */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan todo baru..."
          className="todo-input"
        />
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editingTodo ? 'Update Todo' : 'Tambah Todo'}
          </button>
          {editingTodo && (
            <button 
              type="button" 
              onClick={handleCancelEdit}
              className="btn btn-secondary"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="table-container">
        <table className="todo-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <tr key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className={`status-badge ${todo.completed ? 'badge-completed' : 'badge-pending'}`}
                      disabled={updateMutation.isPending}
                    >
                      {todo.completed ? 'Completed' : 'Pending'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="btn btn-edit"
                        disabled={updateMutation.isPending || deleteMutation.isPending}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="btn btn-delete"
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  Tidak ada data todo
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status mutations */}
      {(createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) && (
        <div className="status-message loading">
          Processing...
        </div>
      )}
      {createMutation.isError && (
        <div className="status-message error">
          Error creating todo: {createMutation.error.message}
        </div>
      )}
      {updateMutation.isError && (
        <div className="status-message error">
          Error updating todo: {updateMutation.error.message}
        </div>
      )}
      {deleteMutation.isError && (
        <div className="status-message error">
          Error deleting todo: {deleteMutation.error.message}
        </div>
      )}
    </div>
  )
}

// Wrapper component dengan QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  )
}

export default App

