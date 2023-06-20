import BudgetItem from './BudgetItem';
import ChartBar from './ChartBar';
import './BudgetsList.css';
import { useEffect, useState } from 'react'; 
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function BudgetsList({onDeleteBudget}) { 

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const text="No budgets set yet. Set one now!"

  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // fetch budget data from database 
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8080/api/add-budget');
      setBudgets(response.data);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleSaveBudgetData = (newBudgetData) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudgetData]);
  };  

  const handleDelete = (id) => {
    onDeleteBudget(id);
  };

  if (budgets.length === 0) { 
    return (<div className="main_container">
      <h1>Existing Budgets</h1>
      <div className="no-budgets-text">{text}</div>
    </div>
    )
  } else {
    return (
      <div className="main_container">
        <h1>Existing Budgets</h1>
      {budgets.map((budget) => { 
          return (
          <ul className="list">
            <BudgetItem className="description" budget={budget} onSaveBudgetData={handleSaveBudgetData}/>
            <ChartBar className="chart" budget={budget}/>
            <div className="delete-icon" onClick={() => handleDelete(budget._id)}>
              <DeleteOutlineIcon/>
            </div>
          </ul>
          )
        })}
      </div>
  )

  }


}

  /*const [budgets, setBudgets] = useState(null);

  useEffect(() => { 
    const fetchBudgets = async () => { 
      const response = await fetch("http://localhost:8080/api/budgetplanner")
      const json = await response.json()

      if (response.ok) { 
        setBudgets(json)
      }
    }

    fetchBudgets()

  }, [])

  return (
    <div className="List">
      <div className="budgets">
        {budgets && budgets.map(() => (
          <p key={budgets.category}>{budgets.category}</p>
        ))}
      </div>
    </div>
  )
  */


  

  /*if (props.items.length === 0) { 
    return <h2 className='budgets-list__fallback'>No budgets set yet. Set one today!</h2>
  };

  return ( 
    <ul className="budgets-list">
      {props.items.map((budget) => (<BudgetItem 
      key={budget.id}
      title={budget.category} 
      amount={budget.amount} />))}
    </ul>
  )
  */
