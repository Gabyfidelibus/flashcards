import { useState, useEffect } from 'react'
import Header from './components/Header'
import SingleCard from './components/SingleCard'
import { db } from './data/db'

function App() {
  
  const [data, setData] = useState([])
  const [flipped, setFlipped] = useState([])

  useEffect(()=> {
    setData(db)
  }, [])

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
          <h3 className='scroll-alert'>Scroll horizontally...</h3>
        </div>
      </main>
    </>
  )
}

export default App
