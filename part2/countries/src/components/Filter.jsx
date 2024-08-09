const Filter = (props) => {
    return (
        <div>
            find countries <input value={props.searchCountry} onChange={props.handleSearchChange}/>
        </div>
    )
}

export default Filter
