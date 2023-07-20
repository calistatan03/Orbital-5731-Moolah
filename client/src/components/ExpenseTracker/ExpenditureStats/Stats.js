import '../../HomePage/HomePage.css';
import { Link } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import './Stats.css'; 
import DoughnutChart from './Doughnut';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import TransactionCalendar from '../FeaturePage/TransactionCalendar';

export default function Stats() {
  const [showDoughnutChart, setShowDoughnutChart] = useState(false); // State to manage the visibility of the chart
  const [transactionList, setTransactionList] = useState([]);
  
  const { user } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [transactions, setTransactions] = useState([]);

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
      setTransactionList(response.data);
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

  return (
    <div className="main_container">
      <NavBar />
      <div>
        {showDoughnutChart && <DoughnutChart transactions={transactions} onSaveTransactionData={handleSaveTransactionData} />}

        {!showDoughnutChart && <TransactionCalendar transactions={transactionList} setTransactionList={setTransactionList} />}
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
