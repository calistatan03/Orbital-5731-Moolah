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
  const [selectedDuration, setSelectedDuration] = useState('month');


  //whenever the 'transactions' passed to the DoughnutChart changes, the 'updateExpenseData' function will be called to recalculate the expense data and update the state variables
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/add-transaction/${selectedDuration}`);
        const fetchedTransactions = response.data;
        setTransactionList(fetchedTransactions);
        updateExpenseData(fetchedTransactions);
        setCategoryColors(generateCategoryColors(fetchedTransactions));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [selectedDuration]);

  const generateCategoryColors = (transactions) => {
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

  const updateExpenseData = (transactions) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const currentDate = new Date();

      let timeDiff;
      if (selectedDuration === 'week') {
        timeDiff = Math.ceil(
          (currentDate.getTime() - transactionDate.getTime()) /
            (1000 * 3600 * 24 * 7)
        );
      } else if (selectedDuration === 'month') {
        timeDiff =
          currentDate.getMonth() - transactionDate.getMonth() + 1;
      } else if (selectedDuration === 'year') {
        timeDiff =
          currentDate.getFullYear() - transactionDate.getFullYear();
    }

    return timeDiff <= 1;
  });

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
    setCategoryColors(generateCategoryColors(filteredTransactions));
    setTransactionList(filteredTransactions);
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
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
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container">
      <div className="split2">
        <div className="doughnut">
          <label className="statstext">Expenditure Statistics</label>
          <div className="filter-container">
            <label htmlFor="durationFilter">Filter By:</label>
            <select
              id="durationFilter"
              value={selectedDuration}
              onChange={handleDurationChange}
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
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
          <TransactionList transactions={transactionList} categoryColors={categoryColors} onDeleteTransaction={deleteTransaction}></TransactionList>
          <Link to="/add-transaction" className="add_button">Add New Transaction Here</Link>
        </div>
      </div>
    </div>
  );
}