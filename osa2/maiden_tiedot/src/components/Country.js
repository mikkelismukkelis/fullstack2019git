import React from 'react'
import Languages from './Languages'
import Flag from './Flag'

const Country = (props) => {
    const country = props.countries[0]
    console.log('country')
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Languages</h2>
            <Languages languages={country.languages} />
            <Flag flag={country.flag} />
        </div>
    )
}

export default Country