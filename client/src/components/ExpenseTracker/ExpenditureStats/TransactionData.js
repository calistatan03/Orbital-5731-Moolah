import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Doughnut from './Doughnut';

export default function TransactionData() {
  const [transactions, setTransactions] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [transactions]);

  async function fetchData() {
    try {
      const response = await axios.get('https://orbital-5731-moolah.onrender.com/api/add-transaction');
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function calculateTotals() {
    const expenseAmounts = transactions
      .filter((transaction) => transaction.category === 'Expense')
      .map((transaction) => transaction.amount);
    const incomeAmounts = transactions
      .filter((transaction) => transaction.category === 'Income')
      .map((transaction) => transaction.amount);

    const expenseTotal = expenseAmounts.reduce((acc, amount) => acc + amount, 0);
    const incomeTotal = incomeAmounts.reduce((acc, amount) => acc + amount, 0);

    setExpenseTotal(expenseTotal);
    setIncomeTotal(incomeTotal);
  }

  return (
    <div>
      <Doughnut transactions={transactions} expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
    </div>
  );
}
