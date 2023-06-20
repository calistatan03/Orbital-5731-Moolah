import React from 'react';
import './TransactionList.css';
import { BiTrash } from 'react-icons/bi';

export default function TransactionList({ transactions, categoryColors, onDeleteTransaction }) {
    const handleDelete = (id) => {
      onDeleteTransaction(id);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Format the date as per the user's locale
    };
  
    return (
      <div>
        <h1 className="historytext">Transaction History</h1>
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className={`transaction-item ${transaction.category.toLowerCase()}`}
              style={{ backgroundColor: categoryColors[transaction.category] }}
            >
              <span className="trans_title">{transaction.title}</span>
              <div className="trans_info">
              <span className="trans_date">{formatDate(transaction.date)}</span>
              <span className="trans_category">{transaction.category}</span>
              <span className="trans_amt">${transaction.amount}</span>
              </div>
              <div className="delete-icon" onClick={() => handleDelete(transaction._id)}>
                <BiTrash />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  