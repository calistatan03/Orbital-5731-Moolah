import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useLogin = () => { 
  const [error, setError] = useState(null) 
  const [isLoading, setIsLoading] = useState(null) 
  const { dispatch } = useAuthContext()
  
  const login = async (email, password) => { 
    setIsLoading(true) 
    setError(null)

    const response = await fetch('http://localhost:8080/api/auth', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
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
      // update loading state
      setIsLoading(false)

      toast.success('Logged in successfully!')
    }

  }
  return { login, isLoading, error }

}