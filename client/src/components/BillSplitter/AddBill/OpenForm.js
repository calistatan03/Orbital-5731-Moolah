import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddForm from './AddForm';
import './OpenForm.css';

export default function OpenForm(props) { 

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

  function saveBillDataHandler(enteredBillData) { 
    // create a new bill 
    const billData = { 
      ...enteredBillData, 
      // the below is a Crypto API built into javascript, allows us to create
      // a random ID 
      //id: crypto.randomUUID(),
      //color: generateRandomColor()
  
    }; 
    props.onAddBudgetChart(billData);
    setIsEditing(false); 
  }

  return <div className="new-bill">
    {!isEditing && <Link to="/add-bill" className="add_bill_button"><button>Add New Bill</button></Link>}
    {isEditing && <AddForm onSaveBillData={saveBillDataHandler} onCancel={stopEditingHandler}/>}
  </div>

}


