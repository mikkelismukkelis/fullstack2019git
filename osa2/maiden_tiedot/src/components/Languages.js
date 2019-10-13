import React from 'react'

const Languages = (props) => {
    const languages = props.languages
    
    const rows = () => languages.map(l => <li key={l.name}>{l.name}</li>)
    
    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

export default Languages