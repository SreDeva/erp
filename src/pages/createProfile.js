import { useState } from "react"
import { useStudentsContext } from "../hooks/useStudentContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ProfileForm = () => {
  const { dispatch } = useStudentsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [roll_no, setRoll_no] = useState('')
  const [reg_no, setReg_no] = useState('')
  const  [branch, setBranch] = useState()
  const [batch, setBatch] = useState()
  const [Class, setClass] = useState()
  const [dob, setDOB] = useState()
  const [gender, setGender] = useState()
  const [address, setAddress] = useState()
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const student = {name, roll_no, reg_no, branch, batch, Class, dob, gender, address}

    const response = await fetch('/api/student', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setRoll_no('')
      setReg_no(null)
      setBranch('')
      setBatch('')
      setClass('')
      setDOB('')
      setGender('')
      setAddress('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_STUDENT', payload: json})
    }
  }

  return (
    <div className="creatediv">
        <form className="create" onSubmit={handleSubmit}>
        <h3>Create your Profile</h3>

        <label>Name :</label>
        <input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
        />

        <label>Roll Number :</label>
        <input 
            type="text"
            onChange={(e) => setRoll_no(e.target.value)}
            value={roll_no}
            className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Register Number :</label>
        <input 
            type="number"
            onChange={(e) => setReg_no(e.target.value)}
            value={reg_no}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>Branch :</label>
        <input 
            type="text"
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>Batch :</label>
        <input 
            type="text"
            onChange={(e) => setBatch(e.target.value)}
            value={batch}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>Class :</label>
        <input 
            type="text"
            onChange={(e) => setClass(e.target.value)}
            value={Class}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>DOB :</label>
        <input 
            type="text"
            onChange={(e) => setDOB(e.target.value)}
            value={dob}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>Gender :</label>
        <input 
            type="text"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>Address :</label>
        <input 
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>Create Profile</button>
        {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}

export default ProfileForm