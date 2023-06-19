import React from 'react';
import './TransactionList.css';
import { BiTrash } from 'react-icons/bi';

export default function TransactionList({ transactions, onDeleteTransaction }) {
    const handleDelete = (id) => {
      onDeleteTransaction(id);
    };
    return (
      <div>
        <h1 className="historytext">Transaction History</h1>
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className={`transaction-item ${transaction.category.toLowerCase()}`}
            >
              <span className="trans_name">{transaction.name}</span>
              <span className="trans_category">{transaction.category}</span>
              <span className="trans_amt">{transaction.amount}</span>
              <div className="delete-icon" onClick={() => handleDelete(transaction._id)}>
                <BiTrash />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  