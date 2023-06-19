import './AddForm.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AddForm({onSaveTransactionData}) {
  const [enteredName, setEnteredName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [error, setError] = useState('');
  

  function nameChangeHandler(event) {
    setEnteredName(event.target.value);
  }

  function categoryChangeHandler(event) {
    setSelectedCategory(event.target.value);
  }

  function amountChangeHandler(event) {
    setEnteredAmount(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const transactionData = {
      name: enteredName,
      category: selectedCategory,
      amount: enteredAmount,
    };

    console.log(transactionData);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/add-transaction',
        transactionData);

      onSaveTransactionData(response.data);
      setEnteredName('');
      setSelectedCategory('');
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
          <div className="new-transaction__control">
            <h1 className="new_trans">New Transaction</h1>
            <label>Name</label>
            <input
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
              className="form-input with-shadow"
            />
          </div>
          <div className="new-transaction__control">
            <label>Category</label>
            <select
              name="category"
              className="form-input with-shadow"
              value={selectedCategory}
              onChange={categoryChangeHandler}
              style={{ width: '20rem', height: '2.5rem' }}
            >
              <option value="" disabled selected>Select category</option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
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
