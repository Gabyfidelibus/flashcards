import { useState, useEffect } from 'react'
import Header from './components/Header'
import SingleCard from './components/SingleCard'
import Filters from './components/Filters'
import { db } from './data/db'

function App() {

  const [data, setData] = useState([])
  const [favSelected, setFavSelected] = useState(false)
  const [cardSelected, setCardSelected] = useState(1)
  const [flipped, setFlipped] = useState([])

  const initLS = ()=> {
    const savedCards = localStorage.getItem('saved_cards')
    if (!savedCards){
      localStorage.setItem('saved_cards', JSON.stringify({id: []}))
    }
  }

  const getSavedCardsID = () => {
    const savedCards = localStorage.getItem('saved_cards')
    return JSON.parse(savedCards).id
  }

  const getFavCards = () => {
    const savedCards = getSavedCardsID()
    let auxCards = []
    db.forEach(card => {
      if (savedCards.includes(card.id)){
        auxCards.push(card)
      }
    });
    return auxCards
  }

  useEffect(()=> {
    initLS()
    setTimeout(()=>{
      showCards(db,false)
      const $containerCards = document.querySelector('.container-cards')
      $containerCards.addEventListener("scroll",handleScroll)
    },20)
    
  }, [db])

  const showCards = (cards,sort) => {
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
      const cardsLS = getSavedCardsID()
      cards.forEach(card => {
        const $star = document.querySelector("#fav-" + card.id)
        if (cardsLS.includes(card.id)) {
          $star.classList.add("active")
        } else {
          $star.classList.remove("active")
        }
      });

      const $containerCards = document.querySelector(".container-cards")
      $containerCards.scrollLeft = 0
      setCardSelected(1)
    }, 20)
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
    let auxCards = []
    let cards = []
    cards = (favSelected) ? getFavCards() : db
    if(selectedCategories.length) {
      cards.forEach(card => {
        if (selectedCategories.includes(card.category)){
          auxCards.push(card)
        }
      });
      showCards(auxCards,false)
    } else {
      showCards(cards,false)
    }
  } 

  const handleScroll = () => {
    const $containerCards = document.querySelector(".container-cards")
    const idCard = 1 + ($containerCards.scrollLeft / 200)
    setCardSelected(idCard)
  }

  const resetFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-form li')
    filterButtons.forEach(btn => {
      if (btn.className.includes("active")){
        btn.classList.toggle("active")
        btn.querySelector('input').checked = false
      }
    });
  }

  const handleSaved = () => {
    const $saved = document.querySelector(".saved")
    $saved.classList.toggle('active')
    setFavSelected(!favSelected)
    showCards((favSelected) ? db : getFavCards())
    resetFilters()
  }

  const handleAddFav = (id) => {
    const $favBTN = document.getElementById("fav-"+id)
    let cardsLS = getSavedCardsID()
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
              <button className='shuffle btn' onClick={()=>showCards(data,true)} ><i className="fa-solid fa-retweet fa-2xl"></i></button>
            </div>
        </div>
        
        <ul className='container-cards'>
          {data.map((card,i)=>(
            <li key={i} className='card'>
              <SingleCard 
                card={card}
                handleClick={handleClick}
                flipped={card == flipped}
                handleAddFav={handleAddFav}
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
