import React, { useState } from "react";
import "./index.css";

// Komponen Child tanpa React.memo
function NormalChild({ value }) {
  console.log("NormalChild render");
  return <p>NormalChild menerima: {value}</p>;
}

// Komponen Child dengan React.memo
const MemoChild = React.memo(function MemoChild({ value }) {
  console.log("MemoChild render");
  return <p>MemoChild menerima: {value}</p>;
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Belajar React.memo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah Count</button>

      <div className="section">
        <h2>Tanpa React.memo</h2>
        <NormalChild value="Hello" />
      </div>

      <div className="section">
        <h2>Dengan React.memo</h2>
        <MemoChild value="Hello" />
      </div>
    </div>
  );
}
