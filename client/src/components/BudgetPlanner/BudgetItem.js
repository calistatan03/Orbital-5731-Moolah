import "./BudgetItem.css";
import { purple } from '@mui/material/colors';
import ChartBar from './ChartBar';
import { BiTrash } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; 
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateBudget } from "../../hooks/useUpdateBudgets";
import { addDays, addWeeks, addMonths, addYears } from "@progress/kendo-date-math";


// props should be a single budget object 
export default function BudgetItem({budget, onDeleteBudget}) {

  const [budgetData, setBudgetData] = useState([])
  const { user } = useAuthContext();
  const today = Date();
  const category = budget.category; 

  const deleteBudget = (id) => { 
    onDeleteBudget(id);
  }

  useEffect(() => { 
    setBudgetData(budget);
  }, [budget])

    // fetch transactionData 
  const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    const url2 = 'https://localhost:8080/api/add-transaction';
    const url = 'https://orbital-5731-moolah.onrender.com/api/add-transaction';
    return axios.get(url, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => res.data);
  }, { 
    placeholderData: [],
    refetchInterval: 1000,
    refetchIntervalInBackground: true
  });

  const filteredTransactions = transactionData.filter((transaction) => 
      transaction.category === budget.category).filter((transaction) =>new Date(budget.startDate) <= new Date(transaction.date) && new Date(transaction.date) <= new Date(budget.endDate))

  return (

    <div className="item_container">
        <span className="budget_details">
          <div className="card">
            <div className="budget_item_category">
              <h2>{budget.category}</h2>
            </div>
            <div className='budget_item_amount'>
              <h2>${budget.amount}</h2>
            </div>
          </div>
        </span>
        <span className="progress_bar">
           <ChartBar filteredTransactions = {filteredTransactions} budget={budget}/> 
        </span>
        <span className="delete-icon" onClick={() => deleteBudget(budget._id)}>
          <BiTrash></BiTrash>
        </span>


    </div>
      
  )
  

}
