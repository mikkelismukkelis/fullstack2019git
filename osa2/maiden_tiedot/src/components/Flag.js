import React from 'react'


const Flag = (props) => {
    const url = props.flag

    return (
        <div>
            <img src={url} alt="Flag" width="180" height="110" />
        </div>
    )
}

export default Flag