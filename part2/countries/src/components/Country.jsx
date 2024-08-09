import { useState, useEffect } from 'react'
import weatherService from '../services/wheater.js'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService.search(country.capital)
            .then(response => {
                setWeather({
                    temperature: response.main.temp,
                    icon: weatherService.icon(response.weather[0].icon)
                })
            })
            .catch(error => {
                console.error(`Error al buscar la data del clima: ${error}`)
            })
    }, [country.capital])

    return (
        <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p><b>Languages:</b></p>
            <ul>
                {Object.values(country.languages).map((language, index) =>
                    <li key={index}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
            <h2>Weather in {country.capital}</h2>
            {weather ? (
                <div>
                    Temperature: {weather.temperature} Celcius
                    <img src={weather.icon} alt="Weather icon"/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Country
