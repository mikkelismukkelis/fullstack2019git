import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const res = await axios.post(baseUrl, object)
    return res.data
}

const voteAnecdote = async (id) => {
    const votedAnecdote = await axios.get(`${baseUrl}/${id}`)
    const newObject = {
        content: votedAnecdote.data.content,
        id: votedAnecdote.data.id,
        votes: votedAnecdote.data.votes + 1
    }

    const res = await axios.put(`${baseUrl}/${id}`, newObject)
    return res.data
}

export default { getAll, createNew, voteAnecdote }