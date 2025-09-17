import './index.css'

const closeHour = 20;
const stillOpen = closeHour > new Date().getHours();
const pizzaData = [
  {
    name: 'Pizza Prosciutto',
    image: 'pizzas/prosciutto.jpg',
    description: 'Pizza with prosciutto and mozzarella',
    price: 10,
    soldOut: true,
  },
  {
    name: 'Pizza Focaccia',
    image: 'pizzas/focaccia.jpg',
    description: 'Pizza with focaccia and mozzarella',
    price: 16,
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    image: 'pizzas/salamino.jpg',
    description: 'Pizza with salamino and mozzarella',
    price: 12,
    soldOut: false,
  },
]

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}
  
function Header(){
  return <h1>Pizza House</h1>
}

function Pizza(props){
  // if (props.soldOut) return <p>Sorry, {props.name} is sold out.</p>
  return <div class= {`pizza ${props.soldOut ? 'sold-out' : ''}`}>
    <img src={props.image} alt={props.name} />
    <h2 style={{ color: 'red', fontSize: '30px', textTransform: 'uppercase' }}>{props.name}</h2>
    <p>{props.description}</p>
    <p>{props.soldOut ? 'Sold Out' : 'Price: ' + props.price}</p>
  </div>
}

function Menu(){
  return <div>
    <h2>Menu</h2>
    {pizzaData.length > 1 ? (
      <>
        <p>We're currently open!</p>
        {pizzaData.map((pizza) => (
          <Pizza
          name={pizza.name}
          image={pizza.image}
          description={pizza.description}
          price={pizza.price}
          soldOut={pizza.soldOut}
          />
        )
        )}
      </>
  ) : <p>We're still working on our menu. Please come back later.</p>}
  </div>
}

function Footer(){
  return <p>
    {
      stillOpen && (
        <span>We're currently open!</span>
      )
    }
  </p>
}

export default App
