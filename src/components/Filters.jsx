import { useState } from 'react'
import './filters.css'

export default function SingleCard ({handleFilter}) {

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

    const handleClick = (category) => {
        let selectedCategories = []
        const $categoryClicked = document.querySelector(category)
        const $filterForm = document.querySelector(".filter-form")
        const categoryList = $filterForm.querySelectorAll("li")
        $categoryClicked.classList.toggle("active")
        categoryList.forEach(e => {
            const $checkbox = e.querySelector("input")
            $checkbox.checked = (e.className.includes("active")) ? true : false
            if (e.className.includes("active")) {
                selectedCategories.push(e.getAttribute("name"))
            }
        });
        handleFilter(selectedCategories)
    }

    return (
        <div className='container-filter'>
            <button className="filter btn" onClick={showFilters}><i className="fa-solid fa-filter fa-2xl"></i></button>
            
            <ul className="filter-form" style={{display: 'none'}}>
                <li id='cb-categoria-1' onClick={()=>handleClick("#cb-categoria-1")} name='números'>
                    <input type='checkbox'/>
                    <button>Números</button>
                </li>
                <li id='cb-categoria-2' onClick={()=>handleClick("#cb-categoria-2")} name='pronombres'>
                    <input type='checkbox'/>
                    <button>Pronombres</button>
                </li>
                <li id='cb-categoria-3' onClick={()=>handleClick("#cb-categoria-3")} name='verbos'>
                    <input type='checkbox'/>
                    <button>Verbos</button>
                </li>
                <li id='cb-categoria-4' onClick={()=>handleClick("#cb-categoria-4")} name='familiares'>
                    <input type='checkbox'/>
                    <button>Familiares</button>
                </li>
                <li id='cb-categoria-5' onClick={()=>handleClick("#cb-categoria-5")} name='relaciones'>
                    <input type='checkbox'/>
                    <button>Relaciones</button>
                </li>
                <li id='cb-categoria-6' onClick={()=>handleClick("#cb-categoria-6")} name='paises'>
                    <input type='checkbox'/>
                    <button>Paises</button>
                </li>
                <li id='cb-categoria-7' onClick={()=>handleClick("#cb-categoria-7")} name='idiomas'>
                    <input type='checkbox'/>
                    <button>Idiomas</button>
                </li>
                <li id='cb-categoria-8' onClick={()=>handleClick("#cb-categoria-8")} name='profesiones'>
                    <input type='checkbox'/>
                    <button>Profesiones</button>
                </li>
            </ul>
            
            <button className="search btn"><i class="fa-solid fa-magnifying-glass fa-2xl"></i></button>
        </div>
    )
}
