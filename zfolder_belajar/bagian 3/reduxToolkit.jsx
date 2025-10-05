import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

// ===========================================
// 1. REDUCERS (Fungsi yang mengubah State)
// ===========================================

// --- A. Counter Reducer ---
const initialCounterState = { count: 0, loading: false };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByPayload: (state, action) => {
      state.count += action.payload;
    },
    setLoading: {
        prepare: (payload) => {
            return {payload}
        },
        reducer: (state, action) => {
            state.loading = action.payload;
        }
    }
  },
});

// --- B. User Reducer ---
const initialUserState = { isLoggedIn: false, username: null };

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
  },
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
// 5. REACT COMPONENTS
// ===========================================

const CounterComponent = () => {
  const count = useSelector(state => state.counter.count); 
  const loading = useSelector(state => state.counter.loading);

  const dispatch = useDispatch(); 
  const handleAsyncIncrement = () => {
    // Dispatch THUNK (fungsi)
    dispatch(incrementAsync(5));
  };

  return (
    <div>
      <h3>Komponen Penghitung (State: counter)</h3>
      <p>Nilai Hitungan: <strong>{count}</strong></p>
      <button onClick={() => dispatch(counterSlice.actions.increment())} disabled={loading}>
        Tambah (+)
      </button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())} disabled={loading}>
        Kurang (-)
      </button>
      <button onClick={handleAsyncIncrement} style={{ marginLeft: '10px', backgroundColor: 'lightcoral' }} disabled={loading}>
        Tambah Asinkron (+5)
      </button>
    </div>
  );
};

const UserComponent = () => {
  const { isLoggedIn, username } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(userSlice.actions.login({ username: 'AdminRedux' }));
  };

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <div>
      <h3>Komponen User (State: user)</h3>
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