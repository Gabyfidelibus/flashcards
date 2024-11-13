export default function SingleCard ({card, handleClick, flipped, handleFav}) {
    
    const handleFlip = () => {
        handleClick(card)
    }
    
    const handleAudio = () => {
        const audioLoader = document.createElement('audio')
        audioLoader.src = import.meta.env.BASE_URL + card.audio
        audioLoader.play()
    }

    return (
        <>
        <div className="favorite-card">
            <button id={"fav-" + card.id} className="favorite-btn" onClick={()=>handleFav(card.id)}><i className="fa-solid fa-star fa-3x"></i></button>
        </div>
        <div className={flipped ? "flipped" : ""} onClick={handleFlip}>
            <div className="front">
                <div className={"value-" + card.id}>
                    <p  className="chinese" 
                        style={{fontSize: (card.chinese.length < 3) ? 50 : (40 - 10*(card.chinese.length - 3)) + 'px'}} >
                        {card.chinese}
                    </p>
                    <p className="pinyin">{card.pinyin}</p>
                </div>
                <img className="image" src={import.meta.env.BASE_URL + card.image} alt={card.spanish}/>
            </div>
            <div className="back">
                <p className="category">{card.category}</p>
                <p className="spanish">{card.spanish}</p>
                <button className="audio" onClick={handleAudio}><i className="fa-solid fa-volume-high fa-rotate-by fa-3x"></i></button>
            </div>
        </div>
        </>
    )
}