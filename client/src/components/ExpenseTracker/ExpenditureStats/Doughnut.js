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
      const url = `https://orbital-5731-moolah.onrender.com/api/add-transaction/${selectedDuration}/${selectedYear}/${selectedMonth}`;
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
      '#FC9F40',
      '#B243FF',
      '#44FFCB',
      '#FF5630',
      '#42FF71',
      '#46B7FF',
      '#FFBF44',
      '#4BFF56',
      '#37FFAF',
      '#FF6E42',
      '#3CB3FF',
      '#FF9542',
      '#3EFF83',
      '#42A2FF',
      '#FFB742',
      '#55FF44',
      '#30FF9F',
      '#FF5036',
      '#36A7FF',
      '#FFB340',
      '#3EFF56',
      '#39FFB2',
      '#FF8C3F',
      '#50B2FF',
      '#FF9830',
      '#34FF79',
      '#3C80FF',
      '#FFA63E',
      '#5BFF47',
      '#33FFAD',
      '#FF7D36',
      '#35ADFF',
      '#FFA33C',
      '#31FF66',
      '#38BFFF',
      '#FF8C36',
      '#43FF7E',
      '#40ADFF',
      '#FF7435',
      '#39A0FF',
      '#FFA036',
      '#34FF74',
      '#41B8FF',
      '#FF9334',
      '#4EFF58',
      '#33FFA3',
      '#FF6036',
      '#39A5FF',
      '#FFA034',
      '#32FF79',
      '#4EA0FF',
      '#FF9730',
      '#43FF57',
      '#30FFA8',
      '#FF6337',
      '#36A3FF',
      '#FF9930',
      '#36FF5B',
      '#42A4FF',
      '#FF9135',
      '#3FFF60',
      '#32FFA7',
      '#FF5E36',
      '#40A5FF',
      '#FF9035',
      '#35FF60',
      '#3EA4FF',
      '#FF8535',
      '#45FF56',
      '#31FFAB',
      '#FF6035',
      '#4C9DFF',
      '#FF9331',
      '#3BFF6E',
      '#3EA6FF',
      '#FF8035',
      '#50FF53',
      '#30FFAF',
      '#FF5B35',
      '#3B9DFF',
      '#FF8D32',
      '#3DFF70',
      '#3BA8FF',
      '#FF7F34',
      '#4EFF52',
      '#30FFB1',
      '#FF5737',
      '#39A7FF',
      '#FF7B32',
      '#36FF73',
      '#46A0FF',
      '#FF6D37',
      '#3BA3FF',
      '#FF7A32',
      '#30FF75',
      '#48ADFF',
      '#FF6137',
      '#3CA3FF',
      '#FF7334',
      '#3EFF70',
      '#42B6FF',
      '#FF6B36',
      '#37A4FF',
      '#FF6D34',
      '#38FF70',
      '#46A4FF',
      '#FF6835',
      '#3AA7FF',
      '#FF6935',
      '#34FF78',
      '#40ADFF',
      '#FF6435',
      '#37A4FF',
      '#FF6333',
      '#3CFF72',
      '#46A5FF',
      '#FF6435',
      '#35A9FF',
      '#FF6134',
      '#39FF71',
      '#45A4FF',
      '#FF5F34',
      '#37ABFF',
      '#FF6034',
      '#38FF72',
      '#48A4FF',
      '#FF5D33',
      '#35A9FF',
      '#FF5F32',
      '#38FF74',
      '#44A5FF',
      '#FF5D33',
      '#36A9FF',
      '#FF5D32',
      '#3BFF76',
      '#43A5FF',
      '#FF5C32',
      '#37ACFF',
      '#FF5C31',
      '#39FF77',
      '#46A6FF',
      '#FF5C31',
      '#36ACFF',
      '#FF5A32',
      '#3CFF78',
      '#44A6FF',
      '#FF5B31',
      '#36ACFF',
      '#FF5A31',
      '#3CFF7A',
      '#46A6FF',
      '#FF5A31',
      '#38ACFF',
      '#FF5A31',
      '#3AFF7C',
      '#47A6FF',
      '#FF5A31',
      '#38ACFF',
      '#FF5930',
      '#3BFF7E',
      '#48A7FF',
      '#FF5B30',
      '#39ADFF',
      '#FF5730',
      '#3CFF7E',
      '#48A7FF',
      '#FF5B30',
      '#38ADFF',
      '#FF5730',
      '#3DFF80',
      '#49A7FF',
      '#FF5B30'    
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
      await axios.delete(url, { 
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
        </div>
      </div>
    </div>
  );
}
