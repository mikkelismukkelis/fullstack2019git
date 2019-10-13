import React from 'react'
import ListCountries from './ListCountries'
import Country from './Country'

const Countries = (props) => {
    const countries = props.countries
    const filter = props.filterValue
    const showCountry = props.showCountry


    if (filter.length === 0 || countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        ) 
    } else if (filter.length > 0 && countries.length === 0) {
        return (
            <div>
                No results, please check filter
            </div>
        )
    } else if (countries.length > 1 && countries.length <= 10) {
        return (
            <div>
                <ListCountries countries={countries} showCountry={showCountry} />
            </div>
        )
    } else {
        return (
            <div>
                <Country countries={countries} />
            </div>
        )
    }
}

export default Countries