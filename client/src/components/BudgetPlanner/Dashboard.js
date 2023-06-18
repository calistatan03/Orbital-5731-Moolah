import { Form, Modal, Stack } from 'react-bootstrap';
import BudgetForm from './BudgetForm';
import {Link} from 'react-router-dom';
import './Dashboard.css'; 
import '../HomePage/HomePage.css';
import BudgetsList from './BudgetsList';
import NavBar from '../NavBar/NavBar';
import NewBudget from './NewBudget';


export default function Display() { 
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <div className="main_container">
			<NavBar/>
      <div className="add_budget_button">
        <Link to="/add-budget" className="button">Add New Budget</Link>
      </div>
      <div className="budget_list">
        <BudgetsList></BudgetsList>
      </div>
		</div>
  )
}
