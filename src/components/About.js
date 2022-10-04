import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
function About() {
  const student=useContext(noteContext);
  return (
    <div>
      <h1>this is {student.name} and my name is {student.age}</h1>
    </div>
  )
}

export default About
