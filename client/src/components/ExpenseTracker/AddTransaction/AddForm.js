import './AddForm.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddForm({onSaveTransactionData}) {
  const [date, setDate] = useState(null);
  const [enteredCategory, setEnteredCategory] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [error, setError] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');

  function titleChangeHandler(event) { 
    setEnteredTitle(event.target.value); 
  }
  
  function dateChangeHandler(event) { 
    setEnteredDate(event.target.value); 
  }

  function categoryChangeHandler(event) {
    setEnteredCategory(event.target.value);
  }

  function amountChangeHandler(event) {
    setEnteredAmount(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const transactionData = {
      title: enteredTitle,
      date: enteredDate,
      category: enteredCategory,
      amount: enteredAmount,
    };

    console.log(transactionData);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/add-transaction',
        transactionData);

      onSaveTransactionData(response.data);
      setEnteredTitle('');
      setEnteredDate('');
      setEnteredCategory('');
      setEnteredAmount('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
      console.error(error);
    }
  }

  

  return (
    <div className="transaction-form_wrapper">
      <form onSubmit={submitHandler}>
        <div className="new-transaction__controls">
        <h1 className="new_trans">New Transaction</h1>
        <div className="new-transaction__control">
            <label>Title</label>
            <input
              type="text"
              className="form-input with-shadow"
              value={enteredTitle}
              onChange={titleChangeHandler}
              style={{ width: '20rem', height: '2.5rem' }}
            />
          </div>
        <div className="new-transaction__control">
          <label>Date</label>
          <input 
            type="date"
            className="form-input with-shadow"
            min="2000-01-01"
            max="2030-01-01" 
            value={enteredDate}
            onChange={dateChangeHandler}/>
        </div>
          <div className="new-transaction__control">
            <label>Category</label>
            <input
              type="text"
              className="form-input with-shadow"
              value={enteredCategory}
              onChange={categoryChangeHandler}
              style={{ width: '20rem', height: '2.5rem' }}
              placeholder='Food, Clothes, Groceries etc.'
            />
          </div>
          <div className="new-transaction__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
              className="form-input with-shadow"
            />
          </div>
        </div>
        <div className="submit_transaction">
          <div className="button_container">
          <button type="submit" className="submit_btn">
            Add Transaction
          </button>
          <Link to="/expensetracker">
          <button type="button" className="view_stats">
            View Expenditure Statistics
          </button>
          </Link>
        </div>
      </div>
      </form>
    </div>
  );
}
