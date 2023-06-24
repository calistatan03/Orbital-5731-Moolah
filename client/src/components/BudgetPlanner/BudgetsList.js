import BudgetItem from './BudgetItem';
import ChartBar from './ChartBar';
import './BudgetsList.css';
import { useEffect, useState } from 'react'; 
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function BudgetsList({transactions, budgets}) { 

  const [budgetData, setBudgetData] = useState(budgets);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const text="No budgets set yet. Set one now!"

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://orbital-5731-moolah.onrender.com/api/add-budget/${id}`);
      setBudgetData((prevBudgets) =>
      prevBudgets.filter((budget) => budget._id !== id)
    );
      // Fetch updated transactions after deletion
      /*const response = await axios.get('https://orbital-5731-moolah.onrender.com/api/add-transaction');
      const updatedTransactions = response.data;
      setTransactionList(updatedTransactions);*/
    } catch (error) {
      console.error(error);
    }
  };

  if (budgets.length === 0) { 
    return <div className="main_container">
      <div>
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
          {budgets.map((budget) => { 
          return (
            <div>
              <BudgetItem className="description" transactions={transactions} budget={budget} onDeleteBudget={handleDelete}/>
            </div>
            
          )
        })}
        </ul>
        </div>
      </div>
  )

  }


  
