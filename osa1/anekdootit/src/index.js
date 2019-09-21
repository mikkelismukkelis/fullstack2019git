import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function generateRandom(selected) {
    let newSelected  = null

    while (newSelected === null || newSelected === selected) {
        newSelected =  Math.floor(Math.random()*6)
    }

    return newSelected
}

function voteSelected(votes, selected) {
    let votesCopy = [...votes]
    votesCopy[selected] += 1 
    return votesCopy
}

const MostVotes = (props) => {
    const votes = props.votes
    const anecdotes = props.anecdotes
    let indexOfMax = votes.indexOf(Math.max(...votes))

    return (

        <div>{anecdotes[indexOfMax]}</div>
    )


}

const App = (props) => {
    
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={() => setVotes(voteSelected(votes, selected))} >Vote</button>
            <button onClick={() => setSelected(generateRandom(selected))}>next anecdote</button>
            <h1>Anectode with most votes</h1>
            <MostVotes votes={votes} anecdotes={props.anecdotes} />
        </div>
    )

}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
<App anecdotes={anecdotes}/>, 
document.getElementById('root')
);


