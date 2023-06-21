import "./BudgetItem.css";
import { purple } from '@mui/material/colors';
import ChartBar from './ChartBar';
import { BiTrash } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import axios from 'axios';


// props should be a single budget object 
export default function BudgetItem({transactions, budget, onDeleteBudget}) {

  const category = budget.category; 

  
  // filter transactions based on category 
  const filteredTransactions = transactions.filter((transaction) => 
    transaction.category === budget.category
  )

  const handleDelete = (id) => {
      onDeleteBudget(id);
    };

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
        <span className="delete-icon" onClick={() => handleDelete(budget._id)}>
          <BiTrash></BiTrash>
        </span>

    </div>
      
  )
  

}