import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from '../hooks/useStudentContext'
import StudentDetails from '../components/studentDetails';

// components


const Home = () => {
  const {students, dispatch} = useStudentsContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('api/student', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_STUDENT', payload: json})
      }
      else {
        console.log('error inloading')
      }
    }

    if (user) {
      fetchStudents()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {students && students.map((student) => (
          <StudentDetails key={student._id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default Home