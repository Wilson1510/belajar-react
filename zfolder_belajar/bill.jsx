import './index.css'
import { useState } from 'react'

const serviceOpinions = [
  {id: 1, opinion: 'Dissatisfied', value: 0},
  {id: 2, opinion: 'It was okay', value: 5},
  {id: 3, opinion: 'It was good', value: 10},
  {id: 4, opinion: 'Absolutely amazing!', value: 20}
]

function App() {
  const [bill, setBill] = useState(0)
  const [value, setValue] = useState(0)
  const [valueFriend, setValueFriend] = useState(0)

  function handleReset(){
    setBill(0)
    setValue(0)
    setValueFriend(0)
  }

  return (
    <div className="">
      <Bill bill={bill} setBill={setBill} />
      <ServiceLike key={1} opinions={serviceOpinions} value={value} setValue={setValue}>
        How did you like the service?
      </ServiceLike>
      <ServiceLike key={2} opinions={serviceOpinions} value={valueFriend} setValue={setValueFriend}>
        How did your friend like the service?
      </ServiceLike>

      <h2>{bill > 0 && `You pay $${bill} ($${bill} + $${(value + valueFriend) / 2 / 100 * bill} tip)`}</h2>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <span>How much you paid?</span>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
    </div>
  )
}

function ServiceLike({ opinions, children, value, setValue }) {
  return (
    <div>
      <span>{children}</span>
      <select value={value} onChange={(e) => setValue(Number(e.target.value))}>
        {opinions.map((opinion) => (
          <option value={opinion.value} key={opinion.id}>{`${opinion.opinion} (${opinion.value}%)`}</option>
        ))}
      </select>
    </div>
  )
}

export default App;