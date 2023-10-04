import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        // const response = await fetch('/api/user/login', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({email, password})
        // })
        const xhr = new XMLHttpRequest();
        const url = 'http://127.0.0.1:8000/api/recevicec/'; // Replace with your Django API endpoint
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
        if (xhr.status === 200) {
            console.log('Request successful:', xhr.responseText);
        } else {
            console.error('Request failed:', xhr.status, xhr.statusText);
        }
        };

        xhr.onerror = () => {
        console.error('Network error');
        };

        const data = JSON.stringify({email, password});
        xhr.send(data)

        const json = await xhr.json()

        if(!xhr.ok){
            setIsLoading(false);
            setError(json.error)
        }
        if (xhr.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
        }
    }

    return {login, isLoading, error}
}