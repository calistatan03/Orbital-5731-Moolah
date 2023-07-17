import { useQueryClient , useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useDeleteBudget = (id) => { 
  const queryClient = useQueryClient(); 
  const {user} = useAuthContext();
  return useMutation((id) => { 

    return axios.delete(`http://localhost:8080/api/add-bill/${id}`, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    });
  }, { 
    onSuccess: () => { 
      queryClient.invalidateQueries('bills')
    }
  })
}