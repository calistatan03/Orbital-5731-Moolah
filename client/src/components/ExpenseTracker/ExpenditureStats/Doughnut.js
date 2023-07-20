import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Doughnut.css';
import TransactionList from './TransactionList';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Unstable_Grid2 } from '@mui/material';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({transactions}) {

  const {user} = useAuthContext(); 
  const [transactionList, setTransactionList] = useState(transactions);
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryNames, setCategoryNames] = useState([]);
  const [labels, setLabels] = useState([]);
  const [categoryColors, setCategoryColors] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('week');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [years, setYears] = useState([]);
  

  const { data: fetchedTransactions, isLoading, isError } = useQuery(
    ['transactions', selectedDuration, selectedYear, selectedMonth, user.token],
    async () => {
      const url = `http://localhost:8080/api/add-transaction/${selectedDuration}/${selectedYear}/${selectedMonth}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      return response.data;
    },
    {
      enabled: Boolean(selectedDuration && selectedYear && selectedMonth && user.token),
      refetchInterval: 1000, 
      refetchIntervalInBackground: true, 
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      placeholderData: [],  }
  );
  
  useEffect(() => {
    if (fetchedTransactions) {
      setTransactionList(fetchedTransactions);
      updateExpenseData(fetchedTransactions);
      setCategoryColors(generateCategoryColors(fetchedTransactions));
    }
  }, [fetchedTransactions]);
  

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => currentYear - index);
    setYears(years);
  }, []);

  const generateCategoryColors = (transactions) => {
    const colors = [
      '#934CFA',
      '#FFCD56',
      '#FF6384',
      '#36A2EB',
      '#FF9F40',
      '#FF8F40',
      '#FC9F40'
    ];

    const uniqueCategories = [...new Set(transactions.map((transaction) => transaction.category))];
    const categoryColors = {};

    uniqueCategories.forEach((category, index) => {
      categoryColors[category] = colors[index % colors.length];
    });

    return categoryColors;
  };

  const updateExpenseData = (transactions) => {
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
    setCategoryColors(generateCategoryColors(transactions));
    setTransactionList(transactions);
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(new Date().getMonth());
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
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
      const url2 = `http://localhost:8080/api/add-transaction/${id}`
      const url = `https://orbital-5731-moolah.onrender.com/api/add-transaction/${id}`
      await axios.delete(url2, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      })
      setTransactionList((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction._id !== id)

    );
    toast.success('Expense deleted successfully!')

    } catch (error) {
      console.error(error);
    }
  };

  const NoTransactionsMessage = () => (
    <div className="no-transactions-message">
      No transactions added yet.
    </div>
  );


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
              <option value="week">Past Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          {selectedDuration === 'month' && (
            <div className="filter-container">
              <label htmlFor="yearFilter">Year:</label>
              <select
                id="yearFilter"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="filter-container">
          {selectedDuration === 'month' && (
  <div className="filter-container">
    <label htmlFor="monthFilter">Month:</label>
    <select
      id="monthFilter"
      value={selectedMonth}
      onChange={handleMonthChange}
    >
      <option value={0}>January</option>
      <option value={1}>February</option>
      <option value={2}>March</option>
      <option value={3}>April</option>
      <option value={4}>May</option>
      <option value={5}>June</option>
      <option value={6}>July</option>
      <option value={7}>August</option>
      <option value={8}>September</option>
      <option value={9}>October</option>
      <option value={10}>November</option>
      <option value={11}>December</option>
    </select>
  </div>
)}

  {selectedDuration === 'year' && (
    <>
      <label htmlFor="yearFilter">Year:</label>
      <select
        id="yearFilter"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  )}
</div>

          <Doughnut
            data={{
              datasets: [
                {
                  data: expenseData,
                  backgroundColor: [
                    '#934CFA',
                    '#FFCD56',
                    '#FF6384',
                    '#36A2EB',
                    '#FF9F40',
                  ],
                  hoverOffset: 4,
                  borderRadius: 20,
                  spacing: 10,
                },
              ],
              labels: categoryNames,
            }}
            options={options}
          />
          <div className="total-expense-text">
            Total Expense: ${totalExpense.toFixed(2)}
          </div>
        </div>
        <div className="history">
          <TransactionList
            transactions={transactionList}
            categoryColors={categoryColors}
            onDeleteTransaction={deleteTransaction}
          />
          <Link to="/add-transaction" className="add_button">
            Add New Transaction Here
          </Link>
        </div>
      </div>
    </div>
  );
}
