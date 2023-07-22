import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function subtractDays(date, days) { 
  date.setDate(date.getDate() - days);
  return date;
}


export default function BudgetStats({ budgetItemData }) {
  
  const { user } = useAuthContext()
  const category = budgetItemData.category
  const recurrence = budgetItemData.recurrence 

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

// fetch all transaction data and filter based on category 
const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    const url2 = 'http://localhost:8080/api/add-transaction';
    const url = 'https://orbital-5731-moolah.onrender.com/api/add-transaction';
    return axios.get(url2, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => res.data);
  }, { 
    placeholderData: [],
    refetchInterval: 1000,
    refetchIntervalInBackground: true
  });

  // array of transactions of the specific budget category 
  const filteredTransactions = transactionData.filter((transaction) => 
      transaction.category === category)

  // handle data based on recurrence - daily, weekly, monthly or yearly
  const today = Date();
  if (recurrence === "Daily") { 
    
    const numbersArray = [5, 4, 3, 2, 1, 0]

    /* const newDay = newDate.toLocaleString('en-US', {day: '2-digit'});
      const newMonth = newDate.toLocaleString('en-US', {month: 'long'});
      const newYear = newDate.getFullYear(); 
      const dateString = newDay + " " + newMonth + " " + newYear;
      return dateString; */
    const datesArray = numbersArray.map((number) => {
      const newDate = new Date(subtractDays(today, number));
      return newDate; 
    })

    



    

    // create an array of total spending for the past 6 recurrences 
    const labels = []

  }

/*const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  

  return <Bar options={options} data={data} />;*/
}
