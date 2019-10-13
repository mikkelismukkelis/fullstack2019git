import React from 'react'

const NotificationMsg = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className="info">
            {message}
        </div>
    )
}

export default NotificationMsg