import "./BudgetItem.css";
import { purple } from '@mui/material/colors';
import ChartBar from './ChartBar';
import { BiTrash } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; 
import { useAuthContext } from "../../hooks/useAuthContext";


// props should be a single budget object 
export default function BudgetItem({budget, onDeleteBudget}) {

  const { user } = useAuthContext();
  const category = budget.category; 

  const deleteBudget = () => { 
    onDeleteBudget(budget._id);
  }

  // fetch transaction data 
  const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    return axios.get('http://localhost:8080/api/add-transaction', { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => res.data);
  }, { 
    placeholderData: [],
  });


  // filter transactions based on category 
  const filteredTransactions = transactionData.filter((transaction) => 
    transaction.category === budget.category
  )

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
           <ChartBar filteredTransactions={filteredTransactions} budget={budget}/> 
        </span>
        <span className="delete-icon" onClick={() => deleteBudget}>
          <BiTrash></BiTrash>
        </span>


    </div>
      
  )
  

}