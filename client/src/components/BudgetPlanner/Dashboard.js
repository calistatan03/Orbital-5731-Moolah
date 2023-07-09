import { Form, Modal, Stack } from 'react-bootstrap';
import BudgetForm from './BudgetForm';
import {Link} from 'react-router-dom';
import './Dashboard.css'; 
import '../HomePage/HomePage.css';
import BudgetsList from './BudgetsList';
import NavBar from '../NavBar/NavBar';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {useAuthContext} from '../../hooks/useAuthContext'
import { BudgetsContext } from '../../context/BudgetsContext'

export default function Display() { 

  //const { budgets, dispatch } = useBudgetsContext(); 
  const {user} = useAuthContext(); 
  const queryClient = useQueryClient();

  const { data: budgetData, isLoading: loadingBudgetData } = useQuery(["budgets"], () => { 
     return axios.get('http://localhost:8080/api/add-budget', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => res.data);
  }, { 
    placeholderData: [],
  });

  const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    return axios.get('http://localhost:8080/api/add-transaction', { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => res.data);
  }, { 
    placeholderData: [],
  });

  /*fetch budget data from database 
  async function fetchBudgets() {

    if (user) { 
      const response = await fetch('http://localhost:8080/api/add-budget', { 
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json() 

    }

  
    try {
      const url2 = 'https://localhost:8080/api/add-budget';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-budget';
      const response = await axios.get(url2);
      setBudgets(response.data);
    } catch (error) {
      console.error(error.response);
    }
  }  */



  
  return (
    <div className="main_container">
			<NavBar/>
      <div className="budget_list">
        <BudgetsList transactions={transactionData} budgets={budgetData}></BudgetsList>
      </div>
      <div className="add_budget_button">
        <Link to="/add-budget" className="add_budget">
          <button>Add New Budget</button>
        </Link>
      </div>
		</div>
  )
}
