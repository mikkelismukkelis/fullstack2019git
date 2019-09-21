import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => (

        <tr>
            <td>
                {text}
            </td>
            <td>
                {value}
            </td>
        </tr>

)


const Statistics = (props) => {

    if (props.all === 0) {
        return (
            <div>
                no feedback given
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text='good' value={props.good} />
                    <Statistic text='neutral' value={props.neutral} />
                    <Statistic text='bad' value={props.bad} />
                    <Statistic text='all' value={props.all} />
                    <Statistic text='average' value={(props.good - props.bad) / props.all} />
                    <Statistic text='positive' value={(props.good / props.all) * 100 + ' %'} />
                </tbody>
            </table>
        </div>
    )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    // Napit omassa tilassaan
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>

            <div>

                <Button
                   onClick={() => {
                        setGood(good + 1)
                        setAll(all + 1)                        
                        }
                    }
                   text='good'
                />

                <Button
                   onClick={() => {
                        setNeutral(neutral + 1)
                        setAll(all + 1)                     
                        }
                    }
                   text='neutral'
                />                

                <Button
                   onClick={() => {
                        setBad(bad + 1)
                        setAll(all + 1)                       
                        }
                    }
                   text='bad'
                />    



            </div>

            <h1>Statistics</h1>

            <Statistics good={good} neutral={neutral} bad={bad} all={all} />

        </div>
    )
}


ReactDOM.render(<App />, 
    document.getElementById('root')
);

