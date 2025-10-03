import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { thunk } from 'redux-thunk'; // Import Redux Thunk

// ===========================================
// 1. REDUCERS (Fungsi yang mengubah State)
// ===========================================

// --- A. Counter Reducer ---
const initialCounterState = { count: 0, loading: false };

const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    // Tambahkan action untuk Thunk
    case 'INCREMENT_BY_PAYLOAD':
        return { ...state, count: state.count + action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// --- B. User Reducer ---
const initialUserState = { isLoggedIn: false, username: null };

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username 
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        username: null
      };
    default:
      return state;
  }
};

// ===========================================
// 2. ROOT REDUCER (Menggabungkan semua Reducer)
// ===========================================

const rootReducer = combineReducers({
  hitung: counterReducer,
  pengguna: userReducer
});

// ===========================================
// 3. ACTION CREATOR UNTUK THUNK
// ===========================================

// Action creator ASINKRON (Thunk)
// Fungsi ini mengembalikan fungsi (thunk) BUKAN objek action biasa
const incrementAsync = (amount) => {
    // Fungsi yang dikembalikan menerima 'dispatch' sebagai argumen
    return (dispatch) => {
        // Simulasikan operasi asinkron (misalnya, network request)
        dispatch({ type: 'SET_LOADING', payload: true });
        console.log(`Menunggu 2 detik sebelum menambah ${amount}...`);
        setTimeout(() => {
            // Setelah operasi selesai, baru dispatch action yang sebenarnya
            dispatch({ type: 'INCREMENT_BY_PAYLOAD', payload: amount });
            console.log("Penambahan selesai!");
            dispatch({ type: 'SET_LOADING', payload: false });
        }, 2000);
    };
};

// ===========================================
// 4. STORE (Pusat Penyimpanan State)
// ===========================================

// Terapkan middleware Thunk saat membuat store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // <--- Penambahan Thunk di sini
);

// ===========================================
// 5. REACT COMPONENTS
// ===========================================

const CounterComponent = () => {
  const count = useSelector(state => state.hitung.count); 
  const loading = useSelector(state => state.hitung.loading);

  const dispatch = useDispatch(); 
  const handleAsyncIncrement = () => {
    // Dispatch THUNK (fungsi)
    dispatch(incrementAsync(5));
  };

  return (
    <div>
      <h3>Komponen Penghitung (State: hitung)</h3>
      <p>Nilai Hitungan: <strong>{count}</strong></p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })} disabled={loading}>
        Tambah (+)
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })} disabled={loading}>
        Kurang (-)
      </button>
      <button onClick={handleAsyncIncrement} style={{ marginLeft: '10px', backgroundColor: 'lightcoral' }} disabled={loading}>
        Tambah Asinkron (+5)
      </button>
    </div>
  );
};

const UserComponent = () => {
  const { isLoggedIn, username } = useSelector(state => state.pengguna);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch({ type: 'LOGIN', payload: { username: 'AdminRedux' } });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      <h3>Komponen User (State: pengguna)</h3>
      <p>Status: 
        <strong>{isLoggedIn ? `Login sebagai ${username}` : 'Belum Login'}</strong>
      </p>
      
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

// ===========================================
// 6. KOMPONEN UTAMA (Provider)
// ===========================================

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Aplikasi Redux Sederhana (Dengan Thunk)</h1>
        
        <hr />
        <CounterComponent />
        
        <hr />
        <UserComponent />
      </div>
    </Provider>
  );
};

export default App;