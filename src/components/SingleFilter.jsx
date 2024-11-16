export default function SingleFilter ({id, category, handleFilterBTN}) {

    const getCategoryID = () => {
        return 'cb-categoria-' + (id+1)
    }

    return (
        <div id={getCategoryID()} onClick={()=>handleFilterBTN('#'+getCategoryID())} name={category}>
            <input type='checkbox'/>
            <button>{category}</button>
        </div>
    )
}