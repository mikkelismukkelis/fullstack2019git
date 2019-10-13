import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import personService from './Services/Persons'
import NotificationMsg from './components/NotificationMsg'
import ErrorMsg from './components/ErrorMsg'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }


  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }


  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)

    setFilteredPersons(persons.filter(function (person){
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  const deletePersonRow = (id, name) => {
    let result = window.confirm(`Delete ${name}`)

    if(result === true) {
      personService
      .deleteRecord(id)
      .then(setPersons(persons.filter(person => person.id !== id )))
      .then(setNotificationMsg(`Deleted ${name}`))
      .then(setTimeout(() => {setNotificationMsg(null)}, 5000))
    }

  }


  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const personNames = () => persons.map(p => p.name)

    const findIndex = personNames().findIndex(pn => pn===personObject.name)

    if(findIndex === -1) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMsg(`Added ${personObject.name}`)
          setTimeout(() => {setNotificationMsg(null)}, 5000)
        })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)) {
        const personId = persons[findIndex].id
        personService
          .update(personId, personObject)
          .then(res => { 
              setPersons(persons.map(p => p.id !== personId ? p : res))
              setNewName('')
              setNewNumber('')
              setNotificationMsg(`Number of ${newName} has been changed`)
              setTimeout(() => {setNotificationMsg(null)}, 5000)
          })
          .catch(e => {
            setErrorMsg(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {setErrorMsg(null)}, 5000)
            setPersons(persons.filter(p => p.id !== personId))
          })
      }

    }
  }


  const arrayToUse = filterValue === '' ? persons : filteredPersons


  const rows = () => arrayToUse.map(p =>
    <Person key={p.id} 
    name={p.name} 
    number={p.number} 
    deletePerson={() => deletePersonRow(p.id, p.name)}
    />

  )


  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationMsg message={notificationMsg} />
      <ErrorMsg message={errorMsg} />

      <FilterForm value={filterValue} onChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm
        personSubmit={addPerson}
        nameValue={newName} 
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {rows()}

    </div>
  )

}

export default App