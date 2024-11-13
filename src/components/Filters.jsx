import { useState } from 'react'
import './filters.css'

export default function SingleCard ({handleFilter}) {

    const [openFilter, setOpenFilter] = useState(false)

    const showFilters = () => {
        const $filterBTN = document.querySelector(".filter")
        const $filterForm = document.querySelector(".filter-form")
        setOpenFilter(!openFilter)
        $filterBTN.style.backgroundColor = (openFilter) ? "transparent" : "#00000088";
        $filterForm.style.display = (openFilter) ? "none" : "flex";
    }

    const handleClick = (category) => {
        let selectedCategories = []
        const $categoryClicked = document.querySelector('.'+category)
        const $filterForm = document.querySelector(".filter-form")
        const categories = $filterForm.querySelectorAll("button")
        $categoryClicked.classList.toggle("active")
        const $checkbox = document.querySelector('#cb-'+category)
        $checkbox.checked = ($categoryClicked.className.includes("active")) ? true : false
        categories.forEach($category => {
            if ($category.className.includes("active")) {
                selectedCategories.push($category.name)
            }
        });
        handleFilter(selectedCategories)
    }

    return (
        <div className='container-filter'>
            <button className="filter btn" onClick={showFilters}><i className="fa-solid fa-filter fa-2xl"></i></button>
            
            <ul className="filter-form" style={{display: 'none'}}>
                <li onClick={()=>handleClick("categoria-1")}>
                    <input type='checkbox' id='cb-categoria-1'/>
                    <button className="categoria-1" name='números' >Números</button>
                </li>
                <li onClick={()=>handleClick("categoria-2")} >
                    <input type='checkbox' id='cb-categoria-2'/>
                    <button className="categoria-2" name='pronombres' >Pronombres</button>
                </li>
                <li onClick={()=>handleClick("categoria-3")} >
                    <input type='checkbox' id='cb-categoria-3'/>
                    <button className="categoria-3" name='verbos' >Verbos</button>
                </li>
                <li onClick={()=>handleClick("categoria-4")} >
                    <input type='checkbox' id='cb-categoria-4'/>
                    <button className="categoria-4"  name='familiares' >Familiares</button>
                </li>
                <li onClick={()=>handleClick("categoria-5")} >
                    <input type='checkbox' id='cb-categoria-5'/>
                    <button className="categoria-5" name='relaciones' >Relaciones</button>
                </li>
                <li onClick={()=>handleClick("categoria-6")} >
                    <input type='checkbox' id='cb-categoria-6'/>
                    <button className="categoria-6" name='paises' >Paises</button>
                </li>
                <li onClick={()=>handleClick("categoria-7")} >
                    <input type='checkbox' id='cb-categoria-7'/>
                    <button className="categoria-7" name='idiomas' >Idiomas</button>
                </li>
                <li onClick={()=>handleClick("categoria-8")} >
                    <input type='checkbox' id='cb-categoria-8'/>
                    <button className="categoria-8" name='profesiones' >Profesiones</button>
                </li>
            </ul>
            
            <button className="search btn"><i class="fa-solid fa-magnifying-glass fa-2xl"></i></button>
        </div>
    )
}
