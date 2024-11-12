export default function SingleCard ({shuffleCards}) {
    
    
    return (
        <div className='container-filter'>
            <button className="filter btn"><i className="fa-solid fa-filter fa-2xl"></i></button>
            <button className="search btn"><i class="fa-solid fa-magnifying-glass fa-2xl"></i></button>
            <button className='shuffle btn' onClick={shuffleCards} ><i className="fa-solid fa-retweet fa-2xl"></i></button>
        </div>
    )
}
