import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Initialize as false
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:8000/api/receivec/'; // Replace with your Django API endpoint
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);

                // Check if there's an error in the response
                if (json.error) {
                    setError(json.error);
                } else {
                    // Save the user to local storage
                    localStorage.setItem('user', JSON.stringify(json));

                    // Update the auth context
                    dispatch({ type: 'LOGIN', payload: json });
                }
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

        const data = JSON.stringify({ email, password });
        xhr.send(data);
    };

    return { login, isLoading, error };
};
