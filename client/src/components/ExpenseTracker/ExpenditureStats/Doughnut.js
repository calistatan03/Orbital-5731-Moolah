import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Doughnut.css';
import TransactionList from './TransactionList';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({transactions}) {
  
  const [transactionList, setTransactionList] = useState(transactions);
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryNames, setCategoryNames] = useState([]);
  const [labels, setLabels] = useState([]);
  const [categoryColors, setCategoryColors] = useState([]);


  //whenever the 'transactions' passed to the DoughnutChart changes, the 'updateExpenseData' function will be called to recalculate the expense data and update the state variables
  useEffect(() => {
    updateExpenseData();
    setCategoryColors(generateCategoryColors());
  }, [transactions]);

  const generateCategoryColors = () => {
    const colors = [
      '#934CFA',
      '#FFCD56',
      '#FF6384',
      '#36A2EB',
      '#FF9F40',
    ];

    const uniqueCategories = [...new Set(transactions.map((transaction) => transaction.category))];
    const categoryColors = {};

    uniqueCategories.forEach((category, index) => {
      categoryColors[category] = colors[index % colors.length];
    });

    return categoryColors;
  };

  const updateExpenseData = () => {
    const expenseCategories = {};

    transactions.forEach((transaction) => {
      if (expenseCategories[transaction.category]) {
        expenseCategories[transaction.category] += transaction.amount;
      } else {
        expenseCategories[transaction.category] = transaction.amount;
      }
    });

    
    const categoryNames = Object.keys(expenseCategories);
    const data = Object.values(expenseCategories); //Object.values to get an array of expense amounts for each category
    setExpenseData(data);
    const totalExpenseAmount = data.reduce((total, amount) => total + amount, 0);
    setTotalExpense(totalExpenseAmount);

    setLabels(categoryNames); 
    setCategoryNames(categoryNames);
  };
  
  
  const options = {
    cutout: 200,
    plugins: {
      tooltip: {
        callbacks: {
          label: (cat) => {
            const labelIndex = cat.dataIndex;
            const value = cat.parsed;
            const percentage = ((value / totalExpense) * 100).toFixed(2);
            return `${percentage}%`;
          }
        }
      }
    }
  };
  
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
          <Doughnut data={{
              datasets: [
                {
                  data: expenseData,
                  backgroundColor: ['#934CFA', '#FFCD56', '#FF6384', '#36A2EB', '#FF9F40'],
                  hoverOffset: 4,
                  borderRadius: 20,
                  spacing: 10,
                },
              ],
              labels: categoryNames,
            }}
            options={options}
          />
          <div className="total-expense-text">Total Expense: ${totalExpense.toFixed(2)}</div>
        </div>  
        <div className="history">
          <TransactionList transactions={transactions} categoryColors={categoryColors} onDeleteTransaction={deleteTransaction}></TransactionList>
          <Link to="/add-transaction" className="add_button">Add New Transaction Here</Link>
        </div>
      </div>
    </div>
  );
}
