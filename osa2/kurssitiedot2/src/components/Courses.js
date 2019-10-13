import React from 'react'

const Header = (props) => {
  
    return (
        <div>
            <h2>
                {props.name}
            </h2>
        </div>
    )
}


const Content = (props) => {
    const {parts} = props

    const partRows = () => 
        parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
 
    return (
        <div>
            {partRows()}
        </div>
    )
}


const Total = (props) => {

    const {parts} = props

    const exercises = () => parts.map(part => part.exercises)
        
    const exerciseSum = exercises().reduce((total, amount) => {
        return total + amount
    })

    return (
        <div>
            <p>
                <b>total of {exerciseSum} exercises</b>
            </p>
        </div>
    )
}


const Course = (props) => {
    const {course} = props
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}


const Courses = (props) => {
    const {courses} = props

    const rows = () => 
        courses.map(course => <Course key={course.name} course={course} />)

    return (
        <div>
            {rows()}
        </div>
    )
}



export default Courses