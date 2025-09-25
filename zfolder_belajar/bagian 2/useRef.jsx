import { useEffect, useState, useRef } from "react";
import "./index.css";

export default function App() {

  const [name, setName] = useState("")
  const inputRef = useRef(null)

  console.log(inputRef.current)

  useEffect(() => {
    console.log("menjalankan effect")
    function callback(e) {
      console.log("menjalankan callback")
      if (document.activeElement === inputRef.current) {
        return;
      }
      if (e.code === "Enter") {
        inputRef.current.focus()
        setName("")
      }
    }
    document.addEventListener("keydown", callback)
    return () => {
      document.removeEventListener("keydown", callback)
    }
  }, [])

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={inputRef}
      />
      <p>{name}</p>
    </div>
  )
}
