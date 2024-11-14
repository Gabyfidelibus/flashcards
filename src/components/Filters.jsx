import { useEffect, useState } from 'react'
import './filters.css'

export default function SingleCard ({handleFilter, handleSearch}) {

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

        document.addEventListener("click",closeFilters)

        $filterBTN.style.backgroundColor = (openFilter) ? "transparent" : "#00000088";
        $filterForm.style.display = (openFilter) ? "none" : "flex";
    }

    const handleFilterBTN = (category) => {
        const $categoryClicked = document.querySelector(category)
        $categoryClicked.classList.toggle("active")

        let selectedCategories = []
        const $filterForm = document.querySelector(".filter-form")
        const categoryList = $filterForm.querySelectorAll("li")
        categoryList.forEach(e => {
            const $checkbox = e.querySelector("input")
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
            $searchBTN.classList.toggle('hidden')
            $searchBar.classList.toggle('hidden')
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
                <li id='cb-categoria-1' onClick={()=>handleFilterBTN("#cb-categoria-1")} name='números'>
                    <input type='checkbox'/>
                    <button>Números</button>
                </li>
                <li id='cb-categoria-2' onClick={()=>handleFilterBTN("#cb-categoria-2")} name='pronombres'>
                    <input type='checkbox'/>
                    <button>Pronombres</button>
                </li>
                <li id='cb-categoria-3' onClick={()=>handleFilterBTN("#cb-categoria-3")} name='verbos'>
                    <input type='checkbox'/>
                    <button>Verbos</button>
                </li>
                <li id='cb-categoria-4' onClick={()=>handleFilterBTN("#cb-categoria-4")} name='familiares'>
                    <input type='checkbox'/>
                    <button>Familiares</button>
                </li>
                <li id='cb-categoria-5' onClick={()=>handleFilterBTN("#cb-categoria-5")} name='relaciones'>
                    <input type='checkbox'/>
                    <button>Relaciones</button>
                </li>
                <li id='cb-categoria-6' onClick={()=>handleFilterBTN("#cb-categoria-6")} name='paises'>
                    <input type='checkbox'/>
                    <button>Paises</button>
                </li>
                <li id='cb-categoria-7' onClick={()=>handleFilterBTN("#cb-categoria-7")} name='idiomas'>
                    <input type='checkbox'/>
                    <button>Idiomas</button>
                </li>
                <li id='cb-categoria-8' onClick={()=>handleFilterBTN("#cb-categoria-8")} name='profesiones'>
                    <input type='checkbox'/>
                    <button>Profesiones</button>
                </li>
            </ul>
            
            <div className="search">
                <label className='btn' onClick={()=>handleSearchBTN()}><i className="fa-solid fa-magnifying-glass fa-2xl"></i></label>
                <input className='hidden' type='text' onChange={e => handleSearch(e.target.value)}/>
            </div>

        </div>
    )
}
