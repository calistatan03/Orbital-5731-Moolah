import { Form, Modal, Stack } from 'react-bootstrap';
import BudgetForm from './BudgetForm';
import {Link} from 'react-router-dom';
import './Dashboard.css'; 
import '../HomePage/HomePage.css';
import BudgetsList from './BudgetsList';
import NavBar from '../NavBar/NavBar';
import NewBudget from './NewBudget';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useState } from 'react';

export default function Display() { 
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/add-budget/${id}`);
      /*setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget._id !== id)
    );
      // Fetch updated transactions after deletion
      const response = await axios.get('http://localhost:8080/api/add-budget');
      const updatedBudgets = response.data;
      setBudgets(updatedBudgets);*/
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="main_container">
			<NavBar/>
      <div className="add_budget_button">
        <Link to="/add-budget" className="button">
          <AddIcon className="icon"/>
          <div>Add New Budget</div>
        </Link>
      </div>
      <div className="budget_list">
        <BudgetsList onDeleteBudget={deleteBudget}></BudgetsList>
      </div>
		</div>
  )
}
