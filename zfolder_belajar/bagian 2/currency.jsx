import { useEffect, useState } from "react";

export default function App() {

  const [amount, setAmount] = useState('')
  const [from, setFrom] = useState('EUR')
  const [to, setTo] = useState('USD')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: controller.signal }
        )
        if (!data.ok) {
          throw new Error('Failed to fetch data')
        }
        const dataJson = await data.json()
        console.log(dataJson)
        setOutput(dataJson.rates[to])
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.error(err.message)
        }
      } finally {
        controller.abort()
        setIsLoading(false)
      }
    }
    if (amount === '' || amount === 0 || isNaN(amount)) {
      setAmount('')
      setOutput('')
      return
    }
    else if (from === to) {
      setOutput(amount)
      return
    }
    fetchData()

    return () => {
      controller.abort()
    }
  }, [amount, from, to])

  return (
    <div style={{fontFamily: 'sans-serif', textAlign: 'center'}}>
      <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      <select value={from} onChange={e => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="IDR">IDR</option>
      </select>
      <select value={to} onChange={e => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="IDR">IDR</option>
      </select>
      <p>{isLoading ? 'Loading...' : output}</p>
    </div>
  )
}
