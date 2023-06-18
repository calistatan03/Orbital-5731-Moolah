import '../../HomePage/HomePage.css';
import NavBar from '../../NavBar/NavBar';
import './Stats.css'; 
import DoughnutChart from './Doughnut';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Stats() {
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
      const response = await axios.get('http://localhost:8080/api/add-transaction');
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  }
 
  const handleSaveTransactionData = (newTransactionData) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransactionData]);
  };  


  return (
    <div className="main_container">
		<NavBar/>
            <div className="doughnutchart">
            <DoughnutChart transactions={transactions} onSaveTransactionData={handleSaveTransactionData}></DoughnutChart>
            </div>
		</div>
  )
}