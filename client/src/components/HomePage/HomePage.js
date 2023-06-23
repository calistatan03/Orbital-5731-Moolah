import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import moolahlogo2 from '../../images/moolahlogo2.png';
import './HomePage.css';

export default function HomePage() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="main-container">
      <NavBar></NavBar>
      <div className="welcome-section">
	  <h1 className="welcome-heading">Welcome to Moolah!</h1>
        <div className="logo-section">
          <img src={moolahlogo2} className="moolah-logo" alt="Moolah! Logo" />
        </div>
      </div>

      <div className="features-section">
        <div className="expensetracker">
          <h2 className="feature-heading">Expense Tracker</h2>
          <p className="feature-description">
            Keep track of your expenses and easily categorize them to gain
            insights into your spending habits!
          </p>
        </div>
        <div className="budgetplanner">
          <h2 className="feature-heading">Budget Planner</h2>
          <p className="feature-description">
            Plan and manage your budgets effectively to achieve your financial
            goals!
          </p>
        </div>
        <div className="billsplitter">
          <h2 className="feature-heading">Bill Splitter</h2>
          <p className="feature-description">
            Easily split bills and expenses with friends, roommates, or
            colleagues without any hassle!
          </p>
        </div>
      </div>
    </div>
  );
}
