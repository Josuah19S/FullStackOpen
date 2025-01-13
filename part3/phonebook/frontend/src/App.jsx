import { useState, useEffect } from "react"
import './index.css'
import Notification from "./components/Notification.jsx"
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import personService from './services/persons.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(false)

  // Effect hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => (
        setPersons(initialPersons)
      ))
  }, [])
  console.log('reder', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setTypeMessage(true)
            setNewMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          })
          .catch(error => {
            setTypeMessage(false)
            setNewMessage(
              `Information of ${newName} has already been remove from server`
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
            console.error(`Error al actualizar el contacto: ${error}`)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) // Agregar persona al arreglo
          setNewName('') // Limpiar la entrada
          setNewNumber('')
          setTypeMessage(true)
          setNewMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error(`Error al establecer un nuevo contacto: ${error}`)
        })
    }
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error(`Error al eliminar el contacto: ${error}`)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const personsToShow = searchName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} type={typeMessage}/>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App
