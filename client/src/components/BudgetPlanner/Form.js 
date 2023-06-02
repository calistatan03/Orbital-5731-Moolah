import './ExpenseForm.css';
import { useState } from 'react';

export default function ExpenseForm(props) { 

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  };

  function amountChangeHandler(event) { 
    setEnteredAmount(event.target.value);
  };

  function dateChangeHandler(event) { 
    setEnteredDate(event.target.value); 
  };

  function submitHandler(event) { 
    event.preventDefault(); 
    const expenseData = { 
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    };
    props.onSaveExpenseData(expenseData);
  }

  return (
  <form onSubmit={submitHandler}>
    <div className="new-expense__controls">
      <div className="new-expense__control">
        <label>Title</label>
        <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
      </div>
      <div className="new-expense__control">
        <label>Amount</label>
        <input type='number' 
          min="0.01" 
          step="0.01" 
          value={enteredAmount}
          onChange={amountChangeHandler}/>
      </div>
      <div className="new-expense__control">
        <label>Date</label>
        <input 
          type="date" 
          min="2019-01-01" 
          max="2023-05-20" 
          value={enteredDate}
          onChange={dateChangeHandler}/>
      </div>
    </div>
    <div className="new-expense__actions">
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button type='submit' onClick={submitHandler}>Add Expense</button>
    </div>
  </form>
  )

}