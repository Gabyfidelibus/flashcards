import { useState, useEffect } from 'react'
import Header from './components/Header'
import SingleCard from './components/SingleCard'
import Filters from './components/Filters'
import { db } from './data/db'

function App() {

  const [data, setData] = useState([])
  const [cardSelected, setCardSelected] = useState(1)
  const [flipped, setFlipped] = useState([])

  const initLS = ()=> {
    const savedCards = localStorage.getItem('saved_cards')
    if (!savedCards){
      localStorage.setItem('saved_cards', JSON.stringify({id: []}))
    }
  }

  const getSavedCards = () => {
    const savedCards = localStorage.getItem('saved_cards')
    return JSON.parse(savedCards).id
  }
  

  useEffect(()=> {
    initLS()
    setTimeout(()=>{
      shuffleCards(db,false)
      const $containerCards = document.querySelector('.container-cards')
      $containerCards.addEventListener("scroll",handleScroll)
    },20)
    
  }, db)

  const shuffleCards = (cards,sort) => {
    let contador = 1
    let shuffledCards = [...cards]
    if (sort) {
      shuffledCards.sort(() => Math.random() - 0.5)
    }
    shuffledCards.forEach(card => {
      card.order = contador++
    });
    setData(shuffledCards)

    setTimeout(()=>{
      const cardsLS = getSavedCards()
      cards.forEach(card => {
        const $star = document.querySelector("#fav-" + card.id)
        if (cardsLS.includes(card.id)) {
          $star.classList.add("active")
        } else {
          $star.classList.remove("active")
        }
      });
    }, 50)
  }
  
  const handleClick = (card) => {
    const $containerCards = document.querySelector('.container-cards')
    if (flipped !== card)
      $containerCards.scroll({
        left: 40 + (card.order-1) * 200,
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
      shuffleCards(cards,false)
    } else {
      shuffleCards(db,false)
    }
  } 

  const handleScroll = () => {
    const $containerCards = document.querySelector(".container-cards")
    const idCard = 1 + ($containerCards.scrollLeft / 200)
    setCardSelected(idCard)

  }

  const handleSaved = () => {
    console.log(cardSelected)
  }

  const handleFav = (id) => {
    const $favBTN = document.getElementById("fav-"+id)
    let cardsLS = getSavedCards()
    $favBTN.classList.toggle("active")
    let index = cardsLS.indexOf(id)
    if (index === -1){
      cardsLS.push(id)
    } else {
      cardsLS.splice(index,1)
    }
    localStorage.setItem('saved_cards',JSON.stringify({id: cardsLS}))
  }

  return (
    <>
      <Header />

      <main>
        <div className='top-panel'>
            <Filters handleFilter={handleFilter}/>
            <div>
              <button className='saved btn' onClick={handleSaved}><i className="fa-solid fa-bookmark fa-2xl"></i></button>
              <button className='shuffle btn' onClick={()=>shuffleCards(data,true)} ><i className="fa-solid fa-retweet fa-2xl"></i></button>
            </div>
        </div>
        
        <ul className='container-cards'>
          {data.map((card,i)=>(
            <li key={i} className='card'>
              <SingleCard 
                card={card}
                handleClick={handleClick}
                flipped={card == flipped}
                handleFav={handleFav}
              />
            </li>
            
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
