import { useAuthContext} from '../hooks/useAuthContext';
import { toast } from 'react-toastify';

export const useLogout = () => { 

  const {dispatch} = useAuthContext(); 

  const logout = () => { 

    // remove user from local storage 
    localStorage.removeItem('user')

    // dispatch logout action 
    dispatch({type: 'LOGOUT'})
    toast.success('Logged out successfully!')

  }

  return {logout}
}