
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}


export const setNotification = (notification, timeoutInS) => {
    let timeout = timeoutInS * 1000
    return async dispatch => {

        dispatch({
        type: 'SET_NOTIFICATION',
        notification
        })

        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        }, timeout)
    }
}





export default notificationReducer