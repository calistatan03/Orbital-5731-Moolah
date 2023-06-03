import { useState } from 'react';
import './NewBudget.css';
import BudgetForm from './BudgetForm';

export default function NewBudget(props) { 

  const [isEditing, setIsEditing] = useState(false); 

  function startEditingHandler() { 
    setIsEditing(true); 
  }

  function stopEditingHandler() { 
    setIsEditing(false); 
  }

  function saveBudgetDataHandler(enteredBudgetData) { 
    const budgetData = { 
      ...enteredBudgetData, 
      id: Math.random().toString() 
    }; 
    props.onAddBudget(budgetData); 
    setIsEditing(false); 
  }

  return <div className="new-budget">
    {!isEditing && <button className="button" onClick={startEditingHandler}>Add New Budget</button>}
    {isEditing && <BudgetForm onSaveBudgetData={saveBudgetDataHandler} onCancel={stopEditingHandler}/>}
  </div>

}
