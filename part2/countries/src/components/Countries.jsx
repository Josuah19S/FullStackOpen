import Country from './Country.jsx'

const Countries = ( {countries, showCountry, onCountryClick} ) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country =>
                    <Country key={country.cca3} country={country}/>
                )}
            </div>
        )
    }

    return (
        <div>
            {countries.map(country =>
                <li key={country.cca3}>
                    {country.name.common}
                        <button onClick={() => onCountryClick(country)}>
                            {showCountry === country ? 'Hide' : 'Show'}
                        </button>
                        {showCountry === country && <Country country={country} />}
                </li>
            )}
        </div>
    )
}

export default Countries
