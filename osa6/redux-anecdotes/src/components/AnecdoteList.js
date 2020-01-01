import React from 'react'
import {connect} from 'react-redux'
import {voteOf} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes

    const vote = (id, content) => {
        props.voteOf(id)
        props.setNotification(`You voted "${content}"`, 5)

    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    voteOf,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

 