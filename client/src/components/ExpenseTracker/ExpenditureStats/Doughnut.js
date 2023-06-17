import React from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Doughnut.css';
import TransactionList from './TransactionList';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const data = {
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#934CFA', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
        borderRadius: 20,
        spacing: 10,
      },
    ],
  };

  const options = {
    cutout: 200,
  };

  return (
    <div className="container">
      <div className="split2">
        <div className="doughnut">
          <h1 className="statistics">Expenditure Statistics</h1>
          <Doughnut data={data} options={options} />
        </div>
        <div className="history">
          <h1 className="historytext">Transaction History</h1>
          <TransactionList />
          <Link to="/add-transaction" className="add_button">Add New Transaction Here</Link>
        </div>
      </div>
    </div>
  );
}
