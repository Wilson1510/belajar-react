import { createContext, useContext, useState } from "react";
import "./index.css";

/* ============================
   1) Tanpa Context (Prop Drilling)
   ============================ */
function GreatGrandChild({ user }) {
  return <p className="box">GreatGrandChild menerima user: {user}</p>;
}

function GrandChild({ user }) {
  return (
    <div className="box">
      <p>GrandChild</p>
      <GreatGrandChild user={user} />
    </div>
  );
}

function Child({ user }) {
  return (
    <div className="box">
      <p>Child</p>
      <GrandChild user={user} />
    </div>
  );
}

function PropDrillingExample() {
  const [user] = useState("Wilson");
  return (
    <div className="section">
      <h2>Contoh Prop Drilling</h2>
      <Child user={user} />
    </div>
  );
}

/* ============================
   2) Dengan Context API
   ============================ */
// Buat Context
const UserContext = createContext();

function CobaContext() {
  const user = useContext(UserContext);
  console.log(`Coba Context: ${user}`);
  return <h1>Coba Context: {user}</h1>;
}

function GreatGrandChildWithContext() {
  const user = useContext(UserContext);
  console.log(`GreatGrandChild With Context: ${user}`);
  return <p className="box">GreatGrandChild menerima user: {user}</p>;
}

function GrandChildWithContext() {
  return (
    <div className="box">
      <p>GrandChilde</p>
      <GreatGrandChildWithContext />
    </div>
  );
}

function ChildWithContext() {
  return (
    <div className="box">
      <p>Child</p>
      <GrandChildWithContext />
    </div>
  );
}

function ContextExample() {
  const [user] = useState("Wilson");
  return (
    <UserContext.Provider value={user}>
      <div className="section">
        <h2>Contoh Context API</h2>
        <ChildWithContext />
      </div>
    </UserContext.Provider>
  );
}

/* ============================
   Main App
   ============================ */
export default function App() {
  return (
    <div className="container">
      <h1>Belajar Context API</h1>
      <PropDrillingExample />
      <ContextExample />
      <CobaContext />
    </div>
  );
}
