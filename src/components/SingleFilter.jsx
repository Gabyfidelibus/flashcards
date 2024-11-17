export default function SingleFilter ({id, category, handleFilterBTN}) {

    const getCategoryID = () => {
        return 'cb-categoria-' + (id+1)
    }

    return (
        <div id={getCategoryID()} name={category}>
            <label className="container-checkbox" >
                <input type='checkbox'/>
                <span className="checkmark" onClick={()=>handleFilterBTN('#'+getCategoryID())}></span>
            </label>
            <button onClick={()=>handleFilterBTN('#'+getCategoryID())}>{category}</button>
        </div>
    )
}