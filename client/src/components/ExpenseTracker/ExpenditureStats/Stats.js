import '../../HomePage/HomePage.css';
import { Link } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import './Stats.css'; 
import DoughnutChart from './Doughnut';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import TransactionCalendar from '../FeaturePage/TransactionCalendar';
import { toast } from 'react-toastify';

export default function Stats() {
  const [showDoughnutChart, setShowDoughnutChart] = useState(false); // State to manage the visibility of the chart
  const [transactions, setTransactions] = useState([]);
  
  const { user } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const url2 = 'http://localhost:8080/api/add-transaction';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-transaction';
      const response = await axios.get(url, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      });
      setTransactions(response.data); // Update state with fetched transactions
    } catch (error) {
      console.error(error);
    }
  }
 
  const handleSaveTransactionData = (newTransactionData) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransactionData]);
  };

  const handleToggleChart = () => {
    setShowDoughnutChart((prevShow) => !prevShow); // Toggle the visibility of the chart
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const url2 = `http://localhost:8080/api/add-transaction/${id}`
      const url = `https://orbital-5731-moolah.onrender.com/api/add-transaction/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main_container">
      <NavBar />
      <div>
        {showDoughnutChart && <DoughnutChart transactions={transactions} onSaveTransactionData={handleSaveTransactionData} />}

        {!showDoughnutChart && <TransactionCalendar transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />}
      </div>
      <div className="button-container">
        <Link to="/add-transaction" className="add-button">
          Add New Transaction Here
        </Link>
        <button className="view-stats-btn" onClick={handleToggleChart}>
          {showDoughnutChart ? 'View Calendar' : 'View Statistics'}
        </button>
      </div>
    </div>
  );
}
