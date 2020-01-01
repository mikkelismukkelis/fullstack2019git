import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type){
    case 'VOTE':
      const id = action.data.id
      const anectodeToVote = state.find(a => a.id === id)
      const votedAnectode = {
        ...anectodeToVote,
        votes: anectodeToVote.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : votedAnectode
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}


export const voteOf = (id) => {

  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}



export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer