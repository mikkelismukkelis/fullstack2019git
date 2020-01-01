import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const NewAnecdote = (props) => {
    
  const addAnectode = async (e) => {
    e.preventDefault()
    const content = e.target.anecdoteInput.value
    e.target.anecdoteInput.value = ''
    props.createAnecdote(content)
    props.setNotification(`Added ${content} succesfully`, 5)

  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnectode}>
            <div><input name="anecdoteInput" /></div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}


const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(
    null,
    mapDispatchToProps
)(NewAnecdote)

