// import { useStudentsContext } from '../hooks/useStudentContext'
// import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import { format } from 'date-fns'

const StudentDetails = ({ student }) => {

    const formattedDOB = format(new Date(student.dob), 'dd-MM-yyyy');
//   const { dispatch } = useStudentsContext()
//   const { user } = useAuthContext()

//   const handleClick = async () => {
//     if (!user) {
//       return
//     }

//     const response = await fetch('/api/student/' + student._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()

//     if (response.ok) {
//       dispatch({type: 'DELETE_STUDENT', payload: json})
//     }
//   }

  return (
    <div className="workout-details">
      <h4>Profile</h4>
      <p><strong>Name: </strong>{student.name}</p>
      <p><strong>Branch: </strong>{student.degree}</p>
      <p><strong>Batch: </strong>{student.batch}</p>
      <p><strong>Class: </strong>{student.Class}</p>
      <p><strong>DOB: </strong>{formattedDOB}</p>
      <p><strong>Gender: </strong>{student.gender}</p>
      <p><strong>Email: </strong>{student.email}</p>
      <p><strong>Roll_No: </strong>{student.roll_no}</p>
      <p><strong>Reg_No: </strong>{student.reg_no}</p>
      <p><strong>Phone_No: </strong>{student.phone_no}</p>
      <p><strong>Address: </strong>{student.address}</p>

      {/* <span className="material-symbols-outlined" onClick={handleClick}>delete</span> */}
      
    </div>
  )
}

export default StudentDetails