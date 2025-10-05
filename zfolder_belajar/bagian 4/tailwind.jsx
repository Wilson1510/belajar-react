function Tombol({children}) {
    return (
      <button className="rounded-full text-white p-4 bg-orange-400">{children}</button>
    )
  }
  
  export default function App() {
    return (
      <div className="bg-blue-500 text-white p-4 rounded-lg">
        <h1 className="hijau">Hello World</h1>
        <Tombol>Click me</Tombol>
        <Tombol>Click me 2</Tombol>
      </div>
    )
  }