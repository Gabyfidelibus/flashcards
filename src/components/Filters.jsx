import { useEffect, useState } from 'react'
import SingleFilter from './singleFilter'
import './filters.css'

export default function SingleCard ({handleFilter, handleSearch, getAllCategories}) {

    const [openFilter, setOpenFilter] = useState(false)
    
    const closeFilters = (event) => {
        const $filterBTN = document.querySelector(".filter")
        const $filterForm = document.querySelector(".filter-form")

        if(!$filterForm.contains(event.target) && !$filterBTN.contains(event.target)){
            setOpenFilter(false)
            $filterBTN.style.backgroundColor = "transparent";
            $filterForm.style.display = "none"
            document.removeEventListener("click",closeFilters)
        }
    }

    const showFilters = () => {
        const $filterBTN = document.querySelector(".filter")
        const $filterForm = document.querySelector(".filter-form")

        setOpenFilter(!openFilter)

        
        const categoryList = $filterForm.querySelectorAll("div")
        categoryList.forEach(e => {
            const $checkbox = e.querySelector("input")
            $checkbox.addEventListener("click",e=>{e.preventDefault()})
        });

        document.addEventListener("click",closeFilters)

        $filterBTN.style.backgroundColor = (openFilter) ? "transparent" : "#00000088";
        $filterForm.style.display = (openFilter) ? "none" : "flex";
    }

    const handleFilterBTN = (category) => {
        const $categoryClicked = document.querySelector(category)
        $categoryClicked.classList.toggle("active")

        let selectedCategories = []
        const $filterForm = document.querySelector(".filter-form")
        const categoryList = $filterForm.querySelectorAll("div")
        categoryList.forEach(e => {
            const $checkbox = e.querySelector("input")
            $checkbox.addEventListener("click",e=>{e.preventDefault()})
            $checkbox.checked = (e.className.includes("active")) ? true : false
            if (e.className.includes("active")) {
                selectedCategories.push(e.getAttribute("name"))
            }
        });

        handleFilter(selectedCategories)
    }

    const closeSearchBar = (event) => {
        const $searchBTN = document.querySelector('.search').querySelector('label')
        const $searchBar = document.querySelector('.search').querySelector('input')
        
        if (!$searchBTN.contains(event.target) && !$searchBar.contains(event.target) && $searchBar.value === '') {
            $searchBTN.classList.remove('hidden')
            $searchBar.classList.add('hidden')
            document.removeEventListener("click",closeSearchBar)
        }
    }

    const handleSearchBTN = () => {
        const $searchBTN = document.querySelector('.search').querySelector('label')
        const $searchBar = document.querySelector('.search').querySelector('input')
        
        $searchBTN.classList.toggle('hidden')
        $searchBar.classList.toggle('hidden')

        $searchBar.focus()

        document.addEventListener("click",closeSearchBar)
    }

    return (
        <div className='container-filter'>
            <button className="filter btn" onClick={showFilters}><i className="fa-solid fa-filter fa-2xl"></i></button>
            
            <ul className="filter-form" style={{display: 'none'}}>
                {getAllCategories().map((category,id)=>(
                    <li key = {id}>
                        <SingleFilter 
                            id = {id}
                            category = {category}
                            handleFilterBTN = {handleFilterBTN}
                        />
                    </li>
                ))}
            </ul>
            
            <div className="search">
                <label className='btn' onClick={()=>handleSearchBTN()}><i className="fa-solid fa-magnifying-glass fa-2xl"></i></label>
                <input className='hidden' type='text' onChange={e => handleSearch(e.target.value)}/>
            </div>

        </div>
    )
}
