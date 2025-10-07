import React, { useState, useMemo, useCallback } from "react";
import "./index.css";


// Komponen Child pakai React.memo
const Child = React.memo(({ onClick }) => {
 console.log("Child render");
 return (
   <div className="box">
     <button onClick={onClick}>Klik Child</button>
   </div>
 );
});


function ExpensiveCalculation(num) {
 console.log("Menghitung...");
 let result = 0;
 for (let i = 0; i < 100000000; i++) {
   result += i % 10;
 }
 return result + num;
}


export default function App() {
 const [count, setCount] = useState(0);
 const [toggle, setToggle] = useState(false);


 // ✅ useMemo → cache hasil perhitungan
 const result = useMemo(() => ExpensiveCalculation(count), [count]);


 // ✅ useCallback → cache fungsi agar referensinya tidak berubah
 const handleClick = useCallback(() => {
   console.log("Child button diklik");
 }, []);


 return (
   <div className="container">
     <h1>Demo useMemo & useCallback</h1>


     <div className="section">
       <h2>useMemo</h2>
       <p>Count: {count}</p>
       <p>Hasil perhitungan: {result}</p>
       <button onClick={() => setCount(count + 1)}>Tambah Count</button>
       <button onClick={() => setToggle(!toggle)}>Toggle: {toggle.toString()}</button>
     </div>


     <div className="section">
       <h2>useCallback + React.memo</h2>
       <Child onClick={handleClick} />
     </div>
   </div>
 );
}
