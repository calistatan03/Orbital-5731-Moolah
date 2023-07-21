import { useQueryClient , useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';


export const useUpdateBudget = (id) => { 
  const queryClient = useQueryClient(); 
  const {user} = useAuthContext();
  return useMutation((id) => { 

    const url2 = `http://localhost:8080/api/add-budget/${id}`
    const url = `https://orbital-5731-moolah.onrender.com/api/add-budget/${id}`
    return axios.put(url, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    });
  }, { 
    onSuccess: () => { 
      queryClient.invalidateQueries('budgets')
    }
  })
}