import './index.css'
import { useState } from 'react'

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];


function App() {

  return (
    <div className="">
      <Accordion data={faqs}/>
    </div>
  )
}

function Accordion({ data }) {
  return <div className='accordion'>
    {data.map((faq, index) => (
      <AccordionItem key={index} number={index + 1} title={faq.title} text={faq.text} />
    ))}
  </div>;
}

function AccordionItem({ number, title, text }) {
  const [isOpen, setIsOpen] = useState(false)

  return <div className={`item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
    <p className='number'>{number > 9 ? number : '0' + number }</p>
    <p className='title'>{title}</p>
    <p className='icon'>{isOpen ? '-' : '+'}</p>
    {isOpen && <div className='content-box'>{text}</div>}
  </div>;
}

export default App;