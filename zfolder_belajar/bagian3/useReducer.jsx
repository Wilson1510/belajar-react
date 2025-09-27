import { useReducer } from "react";

const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      // Mengembalikan objek state baru dengan nilai count yang bertambah
      return { count: state.count + 1 };
    case 'DECREMENT':
      // Mengembalikan objek state baru dengan nilai count yang berkurang
      return { count: state.count - 1 };
    case 'RESET':
      // Mengembalikan kembali ke nilai initialState
      return initialState;
    default:
      // Selalu kembalikan state saat ini jika action tidak dikenal
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Hitungan: {state.count}</h1>
      
      {/* Memanggil dispatch() dengan objek {type: 'ACTION'} 
        untuk memberi tahu reducer apa yang harus dilakukan.
      */}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Tambah (+1)
      </button>
      
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Kurangi (-1)
      </button>

      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </div>
  );
}
