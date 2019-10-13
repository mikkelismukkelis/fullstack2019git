import React from 'react'
import Country from './Country'

const ShowButton = (props) => {
  const country = props.country
  console.log(country)

const nappi = () => {

  console.log('prkl')
}

  return (
    
     <button onClick={nappi} >
      Show
    </button>
    
    )

}


export default ShowButton