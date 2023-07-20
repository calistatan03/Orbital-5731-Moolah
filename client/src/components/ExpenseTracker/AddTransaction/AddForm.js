import './AddForm.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {useAuthContext} from '../../../hooks/useAuthContext'
import { toast } from 'react-toastify';

export default function AddForm({onSaveTransactionData}) {

  const {user} = useAuthContext()
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
      const url2 = 'http://localhost:8080/api/add-transaction';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-transaction';
      const response = await axios.post(
        url,
        transactionData, { 
          headers: { 
            'Authorization': `Bearer ${user.token}`
          }
        }).then(
          toast.success('Expense logged successfully!')
        );

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
    <h1>New Transaction</h1>
      <form className="transaction-form" onSubmit={submitHandler}>
        <div className="new-transaction__controls">
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
        <div className="submit_transaction">
          <button type="submit" className="submit_btn">
            Add Transaction
          </button>
          <Link to="/expensetracker">
          <button type="button" className="view_stats">
            Back
          </button>
          </Link>
      </div>
      </div>
      </form>
    </div>
  );
}
