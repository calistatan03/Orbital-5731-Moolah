import { Form, Modal, Stack } from 'react-bootstrap';
import BudgetForm from './BudgetForm';
import {Link} from 'react-router-dom';
import './Dashboard.css'; 
import '../HomePage/HomePage.css';
import BudgetsList from './BudgetsList';
import NavBar from '../NavBar/NavBar';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useAuthContext} from '../../hooks/useAuthContext'

export default function Display() { 

  const {user} = useAuthContext(); 
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  // fetch budget data from database 
  async function fetchBudgets() {

    if (user) { 
      const response = await fetch('http://localhost:8080/api/add-budget', { 
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json() 

      if (response.ok) { 
        setBudgets(json);
      }
    }
    /*
    try {
      const url2 = 'https://localhost:8080/api/add-budget';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-budget';
      const response = await axios.get(url2);
      setBudgets(response.data);
    } catch (error) {
      console.error(error.response);
    }*/
  }

  // fetch expenses data from database 
  async function fetchExpenses() { 
    try {
      const response = await axios.get('https://orbital-5731-moolah.onrender.com/api/add-transaction');
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  
  return (
    <div className="main_container">
			<NavBar/>
      <div className="budget_list">
        <BudgetsList transactions={transactions} budgets={budgets}></BudgetsList>
      </div>
      <div className="add_budget_button">
        <Link to="/add-budget" className="add_budget">
          <button>Add New Budget</button>
        </Link>
      </div>
		</div>
  )
}
