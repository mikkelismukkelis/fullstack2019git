import React from 'react'
import ShowButton from './ShowButton'
import Country from './Country'

const ListCountries = (props) => {
    const countries = props.countries
    console.log(props.showCountry)


    const rows = () => {
       return countries.map(c => <div key={c.name}> {c.name} <button onClick={props.showCountry}>Show</button> </div>)
    
    }

    return (
        <div>
            {rows()}
        </div>
    )
}

export default ListCountries