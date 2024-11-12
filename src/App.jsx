import { useState, useEffect } from 'react'
import Header from './components/Header'
import SingleCard from './components/SingleCard'
import Filters from './components/Filters'
import { db } from './data/db'

function App() {
  
  const [data, setData] = useState([])
  const [flipped, setFlipped] = useState([])

  useEffect(()=> {
    shuffleCards()
  }, db)

  const shuffleCards = () => {
    let contador = 1
    const shuffledCards = [...db]
      .sort(() => Math.random() - 0.5)
      .map((card)=> ({ ...card, id: contador++}))
    setData(shuffledCards)
  }
  
  const handleClick = (card) => {

    const container = document.querySelector('.container-cards')
    if (flipped !== card)
      container.scroll({
        left: 40 + (card.id-1) * 200,
        behavior: "smooth"
      })

    setFlipped((flipped == card) ? [] : card)
  }

  return (
    <>
      <Header />
      <main>
        <Filters
          shuffleCards={shuffleCards}
        />
        <ul className='container-cards'>
          {data.map((card)=>(
            <SingleCard 
              card={card}
              handleClick={handleClick}
              flipped={card == flipped}
            />
          ))}
        </ul>
        <div>
          <h3 className='scroll-alert'>Scroll horizontal ...</h3>
        </div>
      </main>
    </>
  )
}

export default App
