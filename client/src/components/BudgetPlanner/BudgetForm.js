import './BudgetForm.css';
import { useState } from 'react';
import axios from 'axios';
import NavBar from "../NavBar/NavBar";
import BudgetsList from "./BudgetsList";
import { Link } from 'react-router-dom';


export default function BudgetForm(props) { 

  const [enteredCategory, setEnteredCategory] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [error, setError] = useState('');

  function categoryChangeHandler(event) {
    setEnteredCategory(event.target.value);
  };


  function amountChangeHandler(event) { 
    setEnteredAmount(event.target.value);
  };

  async function submitHandler(event) { 
    event.preventDefault(); 

    const budgetData = { 
      category: enteredCategory,
      amount: +enteredAmount,
    };

    console.log(budgetData);

    try { 

      const response = await axios.post("http://localhost:8080/api/add-budget", budgetData); 
      console.log(response);

      //props.onSaveBudgetData(response.data);
      setEnteredAmount('');
      setEnteredCategory('');
      setError('');
      } catch (error) { 
        console.log(error.response);
    }

      //props.onSaveBudgetData(response.data);
  
  }

  return (
    <div>
      <NavBar/>
      <div className="budget-form_wrapper">
        <form className="budget-form" onSubmit={submitHandler}>
        <div className="new-budget__controls">
          <div className="new-budget__control">
            <label>Category</label>
            <input 
            placeholder="Groceries, Transport, Food..."
            type="text" 
            value={enteredCategory} 
            onChange={categoryChangeHandler}
            className="category_input with-shadow" />
          </div>
          <div className="new-budget__control">
            <label>Amount</label>
            <input type='number' 
              min="0.01" 
              step="0.01" 
              value={enteredAmount}
              onChange={amountChangeHandler}
              className="amount_input with-shadow"/>
          </div>
        </div>
        <div className="new-budget__actions">
          <Link to="/budgetplanner">
          <button type="button" className="cancel">
            Cancel
          </button>
          </Link>
          <button className="submit" type='submit' onClick={submitHandler}>Add Budget</button>
        </div>
      </form>
    </div>
    <BudgetsList/>
  </div>
  
  )

}

// <button className="cancel" type="cancel" onClick={props.onCancel}>Cancel</button>
