import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
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

  return { login, isLoading, error }
}




// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
// import axios from 'axios';


// // export const useLogin = () => {
// //     const [error, setError] = useState(null);
// //     const [isLoading, setIsLoading] = useState(null);
// //     const { dispatch } = useAuthContext();
// //     const [response, setResponse] = useState(null);

// //     const login = async (email, password) => {
// //         setIsLoading(true);
// //         setError(null);

        
// //         axios.post('/api/user/signin/', JSON.stringify({email, password}))
// //             .then((response) => {
// //                 // Handle the successful response
// //                 setResponse(response.data);
// //                 setError(null);
// //             })
// //             .catch((error) => {
// //                 // Handle any errors
// //                 setResponse(null);
// //                 setError(error);
// //             });
// //         // const response = await fetch('/api/user/signup', {
// //         //     method: 'POST',
// //         //     credentials: 'same-origin',
// //         //     headers:{
// //         //         'Content-Type': 'application/json',
// //         //         'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
// //         //         'X-CSRFToken': csrftoken,
// //         // },
// //         //     body: JSON.stringify({email, password}) //JavaScript object of data to POST
// //         // })

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

// //     return {login, isLoading, error}
// // }

// export const useLogin = () => {
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false); // Initialize as false
//     const { dispatch } = useAuthContext();

//     const login = async (email, password) => {
//         setIsLoading(true);
//         setError(null);

//         const xhr = new XMLHttpRequest();
//         const url = 'http://localhost:8000/api/receivec/'; // Replace with your Django API endpoint
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

//     return { login, isLoading, error };
// };
