import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')


  useEffect(() => {
 
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        // console.log(response.data)
      })
  }, [])


  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
  
    setFilteredCountries(countries.filter(function (country){
      return country.name.toLowerCase().includes(e.target.value.toLowerCase())
    }))
    
  }

  const showCountryOf = () => {

    console.log('PRKL, EI ONNISTU')
  }


  return (
    <div>
      <FilterForm value={filterValue} onChange={handleFilterChange} />
      <Countries countries={filteredCountries} filterValue={filterValue} showCountry={() => showCountryOf()} />
 
    </div>
  )

}

export default App