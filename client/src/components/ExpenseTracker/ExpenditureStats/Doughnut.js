import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Doughnut.css';
import TransactionList from './TransactionList';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({transactions}) {

  const [transactionList, setTransactionList] = useState(transactions);

  const expenseTotal = transactions
    .filter((transaction) => transaction.category === 'Expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const incomeTotal = transactions
    .filter((transaction) => transaction.category === 'Income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const data = {
    datasets: [
      {
        data: [expenseTotal, incomeTotal],
        backgroundColor: ['#934CFA', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
        borderRadius: 20,
        spacing: 10,
      },
    ],
  };

  const options = {
    cutout: 200,
  };

  const totalExpenseText = `-$${expenseTotal.toFixed(2)}`;
  const totalIncomeText = `+$${incomeTotal.toFixed(2)}`;

  
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/add-transaction/${id}`);
      setTransactionList((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction._id !== id)
    );
      // Fetch updated transactions after deletion
      /*const response = await axios.get('http://localhost:8080/api/add-transaction');
      const updatedTransactions = response.data;
      setTransactionList(updatedTransactions);*/
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container">
      <div className="split2">
        <div className="doughnut">
          <h1 className="statistics">Expenditure Statistics</h1>
          <Doughnut data={data} options={options} />
          <div className="total-expense-text">{totalExpenseText}</div>
          <div className="total-income-text">{totalIncomeText}</div>
        </div>
        <div className="history">
          <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction}></TransactionList>
          <Link to="/add-transaction" className="add_button">Add New Transaction Here</Link>
        </div>
      </div>
    </div>
  );
}
