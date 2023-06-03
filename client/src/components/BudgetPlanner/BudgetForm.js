import './BudgetForm.css';
import { useState } from 'react';

export default function BudgetForm(props) { 

  const [enteredCategory, setEnteredCategory] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  function categoryChangeHandler(event) {
    setEnteredCategory(event.target.value);
  };

  function amountChangeHandler(event) { 
    setEnteredAmount(event.target.value);
  };

  function submitHandler(event) { 
    event.preventDefault(); 
    const budgetData = { 
      category: enteredCategory,
      amount: +enteredAmount,
    };
    props.onSaveBudgetData(budgetData);
  }

  return (
  <form onSubmit={submitHandler}>
    <div className="new-budget__controls">
      <div className="new-budget__control">
        <label>Category</label>
        <input type="text" value={enteredCategory} onChange={categoryChangeHandler} />
      </div>
      <div className="new-budget__control">
        <label>Amount</label>
        <input type='number' 
          min="0.01" 
          step="0.01" 
          value={enteredAmount}
          onChange={amountChangeHandler}/>
      </div>
    </div>
    <div className="new-budget__actions">
      <button className="cancel" type="cancel" onClick={props.onCancel}>Cancel</button>
      <button className="submit" type='submit' onClick={submitHandler}>Add Budget</button>

    </div>
  </form>
  )

}