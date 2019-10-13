import React from 'react'

const FilterForm = (props) => {

    return (
        <div>
            find countries 
            <input
            value={props.value}
            onChange={props.onChange}
            />
        </div>
    )
}


export default FilterForm