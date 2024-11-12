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
                <div className="value">
                    <p className="chinese">{card.chinese}</p>
                    <p className="pinyin">{card.pinyin}</p>
                </div>
                <img className="image" src={import.meta.env.BASE_URL + card.image} alt={card.spanish}/>
            </div>
            <div className="back">
                <p className="category">{card.category}</p>
                <p className="spanish">{card.spanish}</p>
                <button className="audio" onClick={handleAudio}><i className="fa-duotone fa-solid fa-circle-play fa-4x"></i></button>
            </div>
        </li>
    )
}