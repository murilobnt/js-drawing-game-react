import { useState } from 'react'

export default function useSubjectData() {
  const [subjects, setSubjects] = useState([])

  const createSubject = () => {
    setSubjects([...subjects, ''])
  }

  const deleteSubject = (index) => {
    setSubjects([...subjects.slice(0, index), ...subjects.slice(index + 1)])
  }

  return { subjects, createSubject, deleteSubject }
}
