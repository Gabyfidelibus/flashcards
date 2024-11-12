export default function SingleCard ({card, handleClick, flipped}) {
    
    const handleFlip = () => {
        handleClick(card)
    }
    
    const handleAudio = () => {
        const audioLoader = document.createElement('audio')
        audioLoader.src = import.meta.env.BASE_URL + card.audio
        audioLoader.play()
    }

    return (
        <li className={flipped ? "card flipped" : "card"} onClick={handleFlip}>
            <div className="front">
                <div className={"value-" + card.id}>
                    <p 
                        className="chinese" 
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
        </li>
    )
}