import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../../HomePage/HomePage.css';
import NavBar from '../../NavBar/NavBar';
import {useForm} from 'react-hook-form';
import AddForm from './AddForm';
import React, { useState } from 'react';
import './OpenForm.css';



export default function OpenForm() {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const [transactions, setTransactions] = useState([]);
  const handleSaveTransactionData = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <div className="main_container">
      <NavBar/>
      <div className="form_container">
        <AddForm onSaveTransactionData={handleSaveTransactionData} />
      </div>
    </div>
  );  
}