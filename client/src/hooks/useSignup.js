import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

export const useSignup = () => { 
  const [error, setError] = useState(null) 
  const [isLoading, setIsLoading] = useState(null) 
  const { dispatch } = useAuthContext()
  
  const signup = async (firstName, lastName, email, password) => { 
    setIsLoading(true) 
    setError(null)

    const response = await fetch('http://localhost:8080/api/users', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, email, password})
    })

    const json = await response.json()

    if (!response.ok) { 
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) { 
      // save user to local storage 
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
      toast.success('Account created successfully! You are now logged in.')
      
    }

  }
  return { signup, isLoading, error }




}