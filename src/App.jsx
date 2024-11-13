import { useState, useEffect } from 'react'
import Header from './components/Header'
import SingleCard from './components/SingleCard'
import Filters from './components/Filters'
import { db } from './data/db'

function App() {
  
  const [data, setData] = useState([])
  const [flipped, setFlipped] = useState([])

  useEffect(()=> {
    shuffleCards(db)
  }, db)

  const shuffleCards = (cards) => {
    let contador = 1
    const shuffledCards = [...cards]
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

  const handleFilter = (selectedCategories) => {
    let cards = []
    if(selectedCategories.length) {
      db.forEach(card => {
        if (selectedCategories.includes(card.category)){
          cards.push(card)
        }
      });
      shuffleCards(cards)
    } else {
      shuffleCards(db)
    }
  } 

  return (
    <>
      <Header />

      <main>
        <div className='top-panel'>
            <Filters handleFilter={handleFilter}/>
            <div>
              <button className='saved btn' ><i class="fa-solid fa-bookmark fa-2xl"></i></button>
              <button className='shuffle btn' onClick={()=>shuffleCards(data)} ><i className="fa-solid fa-retweet fa-2xl"></i></button>
            </div>
        </div>
        
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
