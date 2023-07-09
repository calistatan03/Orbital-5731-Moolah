import BudgetItem from './BudgetItem';
import ChartBar from './ChartBar';
import './BudgetsList.css';
import { useEffect, useState, useContext } from 'react'; 
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { BudgetsContext } from '../../context/BudgetsContext';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import './BudgetItem.css';
import { BiTrash } from 'react-icons/bi';
import { purple } from '@mui/material/colors';
import { useDeleteBudget } from '../../hooks/useDeleteBudget';

export default function BudgetsList({transactions, budgets}) { 

  const { user } = useAuthContext();

  
  //const { budgets, setBudgets} = useContext(BudgetsContext);

  const deleteBudgetFunction = (id) => { 
    return axios.delete(`http://localhost:8080/api/add-budget/${id}`, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    });
  }

  const text="No budgets set yet. Set one now!"
  const { mutate } = useDeleteBudget()

  function deleteBudget(id) { 
    mutate(id);
    

      /*setBudgetData((prevBudgets) =>
      prevBudgets.filter((budget) => budget._id !== id))*/
    
  }
 /*
    { 
      onSuccess: () => { 
        queryClient.invalidateQueries(['budgets'])
      }
    }; */

  // fetch budget data 
  const { data: budgetDatas, isLoading: loadingBudgetData } = useQuery(['budgets'], () => { 
     return axios.get('http://localhost:8080/api/add-budget', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => res.data);
  }, { 
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    placeholderData: [],
  });


  // fetch transaction data 
  const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    return axios.get('http://localhost:8080/api/add-transaction', { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => res.data);
  }, { 
    refetchOnMount: true, 
    refetchOnWindowFocus: true,
    placeholderData: [],
  }); 

  /*const handleDelete = async (id) => {
    try {
      const url2 = 'https://localhost:8080/api/add-bill';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
      await axios.delete(`https://localhost:8080/api/add-budget/${id}`);
      setBudgetData((prevBudgets) =>
      prevBudgets.filter((budget) => budget._id !== id)
    );
      // Fetch updated transactions after deletion
      const response = await axios.get('https://orbital-5731-moolah.onrender.com/api/add-transaction');
      const updatedTransactions = response.data;
      setTransactionList(updatedTransactions);
    } catch (error) {
      console.error(error);
    }
  };*/


  if (budgets.length === 0) { 
    return <div className="main_container">
      <div className="header">
          <h1>Existing Budgets</h1>
        </div>
        <div className="no_budgets">
          <h2>You have no budgets set yet. Set one now!</h2>
        </div>
    </div>
  }


    return (
      <div className="main_container">
        <div>
          <h1>Existing Budgets</h1>
        </div>
        <div>
          <ul className="budgetlist">
          {budgetDatas.map((budget) => { 
            return <BudgetItem onDeleteBudget={deleteBudget} transactions={transactionData} budget={budget} />
        })}
        </ul>
        </div>
      </div>
  )

  }


  // <BudgetItem className="description" budget={budget} onDeleteBudget={deleteBudget}/>
