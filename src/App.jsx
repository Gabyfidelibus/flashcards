import { useState, useEffect } from 'react'
import Header from './components/Header'
import SingleCard from './components/SingleCard'
import Filters from './components/Filters'
import { db } from './data/db'

function App() {

  const [data, setData] = useState([])
  const [showedCards, setShowedCards] = useState([])
  const [favSelected, setFavSelected] = useState(false)
  const [cardSelected, setCardSelected] = useState(1)
  const [flipped, setFlipped] = useState([])
  const [filters, setFilters] = useState([])
  const [query, setQuery] = useState('')

  const initLS = ()=> {
    const savedCards = localStorage.getItem('saved_cards')
    if (!savedCards){
      localStorage.setItem('saved_cards', JSON.stringify({id: []}))
    }
  }

  useEffect(()=> {
    initLS()
    setData(db)

    const $containerCards = document.querySelector('.container-cards')
    $containerCards.addEventListener("scroll",handleScroll)
  }, [db])

  const getAllCategories = () => {
    const allCategories = []
    db.forEach(element => {
      if (!allCategories.includes(element.category)){
        allCategories.push(element.category)
      }
    });
    return allCategories
  }

  const shuffleCards = () => {
    let contador = 1
    let newCards = [...showedCards]
    newCards.sort(() => Math.random() - 0.5)
    newCards.forEach(card => {
      card.order = contador++
    });
    setShowedCards(newCards)
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
    setFilters(selectedCategories)
  } 

  const handleScroll = () => {
    const $containerCards = document.querySelector(".container-cards")
    const idCard = 1 + ($containerCards.scrollLeft / 200)
    setCardSelected(idCard)
  }

  const resetSearchBar = () => {
    const $searchBTN = document.querySelector('.search').querySelector('label')
    const $searchBar = document.querySelector('.search').querySelector('input')
  
    $searchBar.value = ''
    $searchBTN.classList.remove('hidden')
    $searchBar.classList.add('hidden')
  }

  const handleSaved = () => {
    const $saved = document.querySelector(".saved")
    $saved.classList.toggle('active')
    setFavSelected(!favSelected)
    resetSearchBar()
  }

  const updateFavData = () => {
    if (favSelected){
      setData(getFavCards())
    } else {
      setData(db)
    }
  }

  useEffect(()=>{
    updateFavData()
  }, [favSelected])

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

  const handleSearch = (text) => {
    setQuery(text)
  }

  const getSeachedCards = () => {

    const cards = (favSelected) ? getFavCards() : db
    let searchedCards = []

    if (query != ''){
      cards.forEach(card => {
        if (card.spanish.includes(query.toLowerCase()) || card.chinese.includes(query.toLocaleLowerCase())) {
          searchedCards.push(card)
        }
      });
    } else {
      searchedCards = cards
    }
    return searchedCards
  }

  useEffect(()=>{
    setData(getSeachedCards())
  }, [query])

  const updateFilteredData = () => {
    let auxCards = []
    let contador = 1
    if (filters.length) {
      data.forEach(card => {
        if (filters.includes(card.category)){
          card.order = contador++
          auxCards.push(card)
        }
      });
    } else {
      data.forEach(card => {
        card.order = contador++
        auxCards.push(card)
      })
    }
    setShowedCards(auxCards)
  }
  
  useEffect(()=>{
    updateFilteredData()
  }, [filters,data])

  useEffect(()=>{
    const cardsLS = getSavedCardsID()
    showedCards.forEach(card => {
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
    
    const $emptyAlert = document.querySelector(".empty-alert")
    const $scrollAlert = document.querySelector(".scroll-alert")
    if (showedCards.length === 0) {
      $emptyAlert.classList.remove('hidden')
      $scrollAlert.classList.add('hidden')
    } else {
      $emptyAlert.classList.add('hidden')
      $scrollAlert.classList.remove('hidden')
    }

  }, [showedCards])

  return (
    <>
      <Header />

      <main>
        <div className='top-panel'>
            <Filters 
              handleFilter={handleFilter} 
              handleSearch={handleSearch}
              getAllCategories={getAllCategories}
            />
            <div className='top-right-panel'>
              <button className='saved btn' onClick={handleSaved}><i className="fa-solid fa-bookmark fa-2xl"></i></button>
              <button className='shuffle btn' onClick={()=>shuffleCards()} ><i className="fa-solid fa-retweet fa-2xl"></i></button>
            </div>
        </div>
        <div className='empty-alert hidden'>
          <h3>Sin resultados...</h3>
        </div>
        <ul className='container-cards'>
          {showedCards.map((card,i)=>(
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

        <div className='scroll-alert'>
          <h3>Scroll horizontal ...</h3>
        </div>
      </main>
    </>
  )
}

export default App
