// import { useEffect }from 'react'
// import { useAuthContext } from "../hooks/useAuthContext"
// import { useStudentsContext } from '../hooks/useStudentContext'
// import StudentDetails from '../components/studentDetails';

// // components


// const Home = () => {
//   const {students, dispatch} = useStudentsContext();
//   const {user} = useAuthContext()

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const response = await fetch('api/student', {
//         headers: {'Authorization': `Bearer ${user.token}`},
//       })
//       const json = await response.json()

//       if (response.ok) {
//         dispatch({type: 'SET_STUDENT', payload: json})
//       }
//       else {
//         console.log('error inloading')
//       }
//     }

//     if (user) {
//       fetchStudents()
//     }
//   }, [dispatch, user])

//   return (
//     <div className="home">
//       <div className="workouts">
//         {students && students.map((student) => (
//           <StudentDetails key={student._id} student={student} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Home


import { useEffect, useState ,useContext }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudentsContext } from '../hooks/useStudentContext'
import StudentDetails from '../components/studentDetails';

// components


const Home = () => {
  const {students, dispatch} = useStudentsContext();
  const {user} = useAuthContext()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState();
  const [response, setResponse] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
    //   const response = await fetch('api/user/studentdetails/', {
    //     method: 'POST',
    //     headers: {},
    //   })
    //   const json = await response.json()

    //   if (response.ok) {
    //     dispatch({type: 'SET_STUDENT', payload: json})
    //   }
    //   else {
    //     console.log('error inloading')
    //   }
    // }

    const xhr = new XMLHttpRequest();
        const url = 'http://localhost:8000/api/user/studentdetails/'; // Replace with your Django API endpoint
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                setResponse(json)
                
            } else {
                console.error('Request failed:', xhr.status, xhr.statusText);
                setError('Request failed');
            }

            setIsLoading(false);
        };

        xhr.onerror = () => {
            console.error('Network error');
            setError('Network error');
            setIsLoading(false);
        };
        const data = JSON.stringify(user)

        xhr.send(data);
      }

    if (user) {
      fetchStudents()
    }
  }, [dispatch, user, error, isLoading, students])


  return (
    <div className="home">
      <div className="workouts">
      {response && (
        <div className="json-response">
          <h2>Profile:</h2>
          <ul>
            {Object.entries(response).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  )
}

export default Home