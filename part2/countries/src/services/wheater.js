import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const iconUrl = 'https://openweathermap.org/img/wn'
const apiKey = import.meta.env.VITE_SOME_KEY

const search = (capital) => {
    const request = axios.get(`${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}

const icon = (weatherIcon) => {
    return `${iconUrl}/${weatherIcon}@2x.png`
}

export default { search, icon }