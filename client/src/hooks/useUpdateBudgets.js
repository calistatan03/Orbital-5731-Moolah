import { useQueryClient , useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';


export const useUpdateBudget = (id) => { 
  const queryClient = useQueryClient(); 
  const {user} = useAuthContext();
  return useMutation((id) => { 

    return axios.put(`http://localhost:8080/api/add-budget/${id}`, { 
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