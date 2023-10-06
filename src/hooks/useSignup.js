import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
//const validator = require('validator')

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
  //const signup = async (email, reg, password, con_password) => {
    setIsLoading(true)
    setError(null)
    // if (!email || !password || !reg || !con_password) {
    //   throw Error('All fields must be filled')
    // }
    // if (!validator.isEmail(email)) {
    //   throw Error('Email not valid')
    // }
    // if (!validator.isStrongPassword(password)) {
    //   throw Error('Password not strong enough')
    // }
    // if (!password === con_password){
    //   throw Error('Confirm password must be same as password')
    // }

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
      //body: JSON.stringify({ email, reg, password, con_password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}




// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";

// // export const useSignup = () => {
// //     const [error, setError] = useState(null);
// //     const [isLoading, setIsLoading] = useState(null);
// //     const { dispatch } = useAuthContext();
// //     const csrftoken = "{{ csrf_token }}";

// //     const signup = async (email, password) => {
// //         setIsLoading(true);
// //         setError(null);

        

// //         const response = await fetch('/api/user/signup', {
// //             method: 'POST',
// //             credentials: 'same-origin',
// //             headers:{
// //                 'Content-Type': 'application/json',
// //                 'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
// //                 'X-CSRFToken': csrftoken,
// //         },
// //             body: JSON.stringify({email, password}) //JavaScript object of data to POST
// //         })

// //         const json = await response.json()

// //         if(!response.ok){
// //             setIsLoading(false);
// //             setError(json.error)
// //         }
// //         if (response.ok) {
// //             //save the user to local storage
// //             localStorage.setItem('user', JSON.stringify(json))

// //             //update the auth context
// //             dispatch({type: 'LOGIN', payload: json})

// //             setIsLoading(false);
// //         }
// //     }

// //     return {signup, isLoading, error}
// // }

// export const useSignup = () => {
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false); // Initialize as false
//     const { dispatch } = useAuthContext();

//     const signup = async (email, password) => {
//         setIsLoading(true);
//         setError(null);

//         const xhr = new XMLHttpRequest();
//         const url = 'http://localhost:8000/api/user/signup/'; // Replace with your Django API endpoint
//         xhr.open('POST', url, true);
//         xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

//         xhr.onload = () => {
//             if (xhr.status === 200) {
//                 const json = JSON.parse(xhr.responseText);

//                 // Check if there's an error in the response
//                 if (json.error) {
//                     setError(json.error);
//                 } else {
//                     // Save the user to local storage
//                     localStorage.setItem('user', JSON.stringify(json));

//                     // Update the auth context
//                     dispatch({ type: 'LOGIN', payload: json });
//                 }
//             } else {
//                 console.error('Request failed:', xhr.status, xhr.statusText);
//                 setError('Request failed');
//             }

//             setIsLoading(false);
//         };

//         xhr.onerror = () => {
//             console.error('Network error');
//             setError('Network error');
//             setIsLoading(false);
//         };

//         const data = JSON.stringify({ email, password });
//         xhr.send(data);
//     };

//     return { signup, isLoading, error };
// };
