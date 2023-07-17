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
import { addDays, addWeeks, addMonths, addYears, durationInMonths, durationInYears } from "@progress/kendo-date-math";


export default function BudgetsList() { 

  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  useEffect(() => {budgetData.forEach(checkDateValidity)})
  
  //const { budgets, setBudgets} = useContext(BudgetsContext);

  const deleteBudgetFunction = (id) => { 
    return axios.delete(`http://localhost:8080/api/add-budget/${id}`, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    });
  }

  const text="No budgets set yet. Set one now!"
  const { mutate } = useDeleteBudget();

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

  // check validity of data based on date 
  function checkDateValidity(budget) { 
    if (new Date(budget.endDate) < new Date(Date())) { 
      console.log('Function reached')
    // if endDate is not valid -> update startDate and endDate
      const numOfDays = durationInDays(new Date(budget.endDate), new Date())
      const numOfWeeks = durationInWeeks(new Date(budget.endDate), new Date())
      const numOfMonths = durationInMonths(new Date(budget.endDate), new Date())
      const numOfYears = durationInYears(new Date(budget.endDate), new Date())
      const endDate = (budget.recurrence === "Daily") ? addDays(new Date(budget.endDate), numOfDays + 1) : 
        budget.recurrence === "Weekly" ? addWeeks(new Date(budget.endDate), numOfWeeks) : 
        budget.recurrence === "Monthly" ? addMonths(new Date(budget.endDate), numOfMonths) : 
        addYears(new Date(budget.endDate), numOfYears)
      const startDate = (budget.recurrence === "Daily") ? addDays(new Date(budget.endDate), numOfDays) : 
        budget.recurrence === "Weekly" ? addWeeks(new Date(budget.endDate), numOfWeeks - 1) : 
        budget.recurrence === "Monthly" ? addMonths(new Date(budget.endDate), numOfMonths - 1) : 
        addYears(new Date(budget.endDate), numOfYears - 1)

      const updatedBudget = {startDate: startDate, endDate: endDate}
      try { 
        const response =  axios.patch(`http://localhost:8080/api/add-budget/${budget._id}`, updatedBudget, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      });
      console.log('Successfully updated')
      } catch (error) { 
        console.log(error)
      }
    } 
  }

  // fetch budget data 
  const { data: budgetData, isLoading: loadingBudgetData } = useQuery(['budgets'], () => { 
     return axios.get('http://localhost:8080/api/add-budget', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => res.data);
  }, { 
    refetchOnMount: true,
    refetchInterval: 1000, 
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: true,
    placeholderData: [],
  });

  function durationInWeeks(d1, d2) { 
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
  }

  function durationInDays(d1, d2) { 
    return Math.round((d2 - d1) / (24 * 60 * 60 * 1000))

  }

  // fetch transaction data 
  const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    return axios.get('http://localhost:8080/api/add-transaction', { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => res.data);
  }, { 
    refetchOnMount: true, 
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
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


  if (budgetData.length === 0) { 
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
          {budgetData.map((budget) => { 
            return <BudgetItem onDeleteBudget={deleteBudget} transactions={transactionData} budget={budget} />
        })}
        </ul>
        </div>
      </div>
  )

  }


  // <BudgetItem className="description" budget={budget} onDeleteBudget={deleteBudget}/>
