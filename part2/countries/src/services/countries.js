import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const search = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

export default { getAll, search }