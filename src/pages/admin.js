import React, { useEffect, useState } from 'react';
import StudentDetails from '../components/studentDetails';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const [students, setStudents] = useState([]);
  const {user} = useAuthContext()
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/admin', {
            headers: {'Authorization': `Bearer ${user.token}`},
          });
        const data = await response.json();

        if (response.ok) {
          setStudents(data);
        } else {
          console.log('Error loading students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [user]);

  return (
    <div className="home">
      <div className="workouts">
        {students && students.map((student) => (
          <StudentDetails key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default Home;
