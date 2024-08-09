import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Countries from './components/Countries.jsx'
import countryService from './services/countries.js'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setSearchCountry(searchValue)

    if(searchValue === ''){
      setShowCountry(null)
      countryService
        .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
        })
    } else {
      countryService
        .search(searchValue)
        .then(filteredCountries => {
          setCountries(filteredCountries)
          setShowCountry(null)
        })
        .catch(error => {
          console.error(`Error al buscar el país: ${error}`)
        })
    }
  }

  const handleCountryClick = (country) => {
    setShowCountry(showCountry === country ? null : country)
  }

  const countriesToShow = searchCountry === '' ? countries : countries.filter(country =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    )

  return (
    <div>
      <Filter seachCountry={searchCountry} handleSearchChange={handleSearchChange}/>
      <Countries
        countries={countriesToShow}
        showCountry={showCountry}
        onCountryClick={handleCountryClick}/>
    </div>
  )
}

export default App
