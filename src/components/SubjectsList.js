import React, { useState } from 'react'
import SubjectForm from './SubjectForm'
import useSubjectData from '../hooks/subjectHook'

export default function QuestionList() {
  const [mode, setMode] = useState('view')
  const [current, setCurrent] = useState(null)

  const {
    subjects,
    createSubject,
    deleteSubject
  } = useSubjectData()

  const addSubject = () => {
    createSubject()
    setCurrent(subjects.length)
    setMode('add')
  }

  const editSubject = (index) => {
    setCurrent(index)
    setMode('edit')
  }

  const removeSubject = (index) => {
    deleteSubject(index)
  }

  const cancelChanges = () => {
    if (mode === 'add') {
      removeSubject(subjects.length - 1)
    }
    setMode('view')
  }

  if (mode === 'view') {
    const qsts = subjects.map((q, i) => (
      <p key={i}>
        <b>P: </b>
        {q.statement}
        <button className="m5" onClick={() => editSubject(i)}>
          Edit
        </button>
        <button className="m5" onClick={() => removeSubject(i)}>
          Remove
        </button>
        <br />
      </p>
    ))
    return (
      <>
        <h2>Subjects</h2>
        <button onClick={addSubject}>New subject</button>
        {qsts}
      </>
    )
  } else {
    return (
      <SubjectForm
        subject={subjects[current]}
      />
    )
  }
}
