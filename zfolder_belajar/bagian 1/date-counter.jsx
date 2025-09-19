import './index.css'
import { useState } from 'react'

function App() {
  const [rangeValue, setRangeValue] = useState(1)
  const [numberValue, setNumberValue] = useState(0)

  function handleOnChange(e){
    setNumberValue(Number(e.target.value))
  }

  function handleReset(){
    setRangeValue(1)
    setNumberValue(0)
  }

  const date = new Date();
  date.setDate(date.getDate() + numberValue);

  return (
    <div className="app-container">
      <input
        type="range"
        min="1"
        max="10"
        value={rangeValue}
        onChange={(e) => setRangeValue(Number(e.target.value))}
      />
      <span className="range-value">{rangeValue}</span>
      <div className="number-input">
        <button onClick={() => setNumberValue(Number(numberValue - rangeValue))}>
          -
        </button>
        <input
          type="text"
          value={numberValue}
          onChange={(e) => handleOnChange(e)}
        />
        <button onClick={() => setNumberValue(Number(numberValue + rangeValue))}>
          +
        </button>
      </div>
      <p>
          {numberValue > 0 && `${numberValue} days from today is ${date.toDateString()}`}
          {numberValue === 0 && `Today is ${date.toDateString()}`}
          {numberValue < 0 && `${Math.abs(numberValue)} days ago was ${date.toDateString()}`}
      </p>
      {(numberValue !== 0 || rangeValue !== 1) && (
        <button onClick={() => handleReset()}>Reset</button>
      )}
    </div>
  )
}

export default App;