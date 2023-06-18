import { useState } from 'react';
import './NewBudget.css';
import BudgetForm from './BudgetForm';
import { Link } from 'react-router-dom';

export default function NewBudget(props) { 

  const [isEditing, setIsEditing] = useState(false); 

  function startEditingHandler() { 
    setIsEditing(true); 
  }

  function stopEditingHandler() { 
    setIsEditing(false); 
  }

  // to generate a random color for the budget created
  function generateRandomColor() { 
    const existingBudgetLength = 2; 
    return `${existingBudgetLength * 34} 65% 50%`
  }

  function saveBudgetDataHandler(enteredBudgetData) { 
    // create a new budget 
    const budgetData = { 
      ...enteredBudgetData, 
      // the below is a Crypto API built into javascript, allows us to create
      // a random ID 
      //id: crypto.randomUUID(),
      //color: generateRandomColor()
  
    }; 
    props.onAddBudgetChart(budgetData);
    setIsEditing(false); 
  }

  return <div className="new-budget">
    {!isEditing && <Link to="/add-budget" className="button" onClick={startEditingHandler}>Add New Budget</Link>}
    {isEditing && <BudgetForm onSaveBudgetData={saveBudgetDataHandler} onCancel={stopEditingHandler}/>}
  </div>

}
