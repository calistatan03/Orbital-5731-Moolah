import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import { addMonths, addWeeks, addYears, firstDayOfMonth, lastDayOfMonth } from '@progress/kendo-date-math';

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
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BiNoEntry } from 'react-icons/bi';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, 
  annotationPlugin
);

function subtractDays(date, days) { 
  date.setDate(new Date(date).getDate() - days);
  return date;
}

function subtractMonths(date, months) {
  date.setMonth(new Date(date).getMonth() - months);
  return date;
}

function subtractYears(date, years) {
  date.setFullYear(new Date(date).getFullYear() - years);
  return date;
}


export default function BudgetStats({ budgetItemData }) {
  
  const { user } = useAuthContext()
  const category = budgetItemData.category;
  const amount = budgetItemData.amount;
  const recurrence = budgetItemData.recurrence;
  const startDate = budgetItemData.startDate;
  const numbersArray = [5, 4, 3, 2, 1, 0];
  const cycle = (recurrence === "Daily") ? "Days" : (recurrence === "Weekly") ? "Weeks" : (recurrence === "Monthly") ? "Months" : "Years"


  const options = {
  responsive: true,
  maintainAspectRatio: false, 
  scales: { 
    y: {
      beginAtZero: true, 
      ticks: {
        callback: function(value, index, values) { 
          return '$' + value;
        }
      }
    }
  },
  plugins: {
    annotation: { 
      annotations: {
        line1: { 
          type: 'line', 
          yMin: amount,
          yMax: amount, 
          borderWidth: 1,
          borderColor: 'rgb(255,0,0)',
          label: { 
            content: `Budget: $${amount}`,
            display: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'transparent',
            color: 'black',
            padding: 0,
            position: '0%', 
          }
        },
      }
    },
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: `Spending for ${category} Over The Past 6 ${recurrence} Cycles`,
    },
    
  },
};

// fetch all transaction data and filter based on category 
const { data: transactionData, isLoading: loadingTransactionData } = useQuery(["transactions"], () => { 
    const url2 = 'http://localhost:8080/api/add-transaction';
    const url = 'https://orbital-5731-moolah.onrender.com/api/add-transaction';
    return axios.get(url, { 
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
    
  console.log(filteredTransactions);

  const budgetArray = numbersArray.map((number) => { 
    return amount;
  })

  // handle data based on recurrence - daily, weekly, monthly or yearly
  const today = Date();
  if (recurrence === "Daily") { 
  

    /* const newDay = newDate.toLocaleString('en-US', {day: '2-digit'});
      const newMonth = newDate.toLocaleString('en-US', {month: 'long'});
      const newYear = newDate.getFullYear(); 
      const dateString = newDay + " " + newMonth + " " + newYear;
      return dateString; */
    const datesArray = numbersArray.map((number) => {
      const newDate = new Date(subtractDays(new Date(), number));
      return newDate; 
    })
    console.log(datesArray)

    // now we have an array of dates, we can map that into an array of sum of expenses for that category for each date
    const expensesArray = datesArray.map((date) => { 
      
      const filteredArray = filteredTransactions.filter((transaction) => new Date(transaction.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0))
      const expenses = filteredArray.reduce((prev, curr) => prev + curr.amount, 0);
      return expenses;
    })
  
    console.log(expensesArray)

    // create an array of total spending for the past 6 recurrences 
    const labels = datesArray.map((date) => { 
      const newDay = date.toLocaleString('en-US', {day: '2-digit'});
      const newMonth = date.toLocaleString('en-US', {month: 'long'});
      const newYear = date.getFullYear(); 
      const dateString = newDay + " " + newMonth + " " + newYear;
      return dateString; 
    }) 

    const data = {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: expensesArray,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  
    return <Bar options={options} data={data} />
  } else if (recurrence === "Weekly") { 

    // convert numbersArray to an array of week periods 
    const startDatesArray = numbersArray.map((number) => { 
      const newStartDate = new Date(subtractDays(new Date(startDate), number * 7))
      return newStartDate;
    })

    // now we have an array of dates, we can map that into an array of sum of expenses for that category for each date
    const expensesArray = startDatesArray.map((date) => { 

      const endDate = new Date(addWeeks(new Date(date), 1));
      const filteredArray = filteredTransactions.filter((transaction) => new Date(date).setHours(0, 0, 0, 0) <= new Date(transaction.date).setHours(0, 0, 0, 0) && 
        new Date(transaction.date).setHours(0, 0, 0, 0) <= new Date(endDate).setHours(0, 0, 0, 0)
      )
      const expenses = filteredArray.reduce((prev, curr) => prev + curr.amount, 0);
      return expenses;
    })

    // create an array of total spending for the past 6 recurrences 
    const labels = startDatesArray.map((date) => { 
      const startDay = date.toLocaleString('en-US', {day: '2-digit'});
      const startMonth = date.toLocaleString('en-US', {month: 'long'});
      const startYear = date.getFullYear(); 
      const startDateString = startDay + " " + startMonth + " " + startYear 
      const endDate = new Date(addWeeks(new Date(date), 1))
      const endDay = endDate.toLocaleString('en-US', {day: '2-digit'});
      const endMonth = endDate.toLocaleString('en-US', {month: 'long'});
      const endYear = endDate.getFullYear();
      const endDateString = endDay + " " + endMonth + " " + endYear;
      const dateString = startDateString + " - " + endDateString;
      return dateString; 
    })

    const data = {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: expensesArray,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    return <Bar options={options} data={data} />

  } else if (recurrence === "Monthly") { 

    // convert numbersArray to an array of month periods 
    const startDatesArray = numbersArray.map((number) => { 
      const newDate = new Date(subtractMonths(new Date(startDate), number));
      return newDate; 
    })

    console.log('Reached')

    // now we have an array of dates, we can map that into an array of sum of expenses for that category for each date
    const expensesArray = startDatesArray.map((date) => { 

      const endDate = new Date(addMonths(new Date(date), 1));
      const filteredArray = filteredTransactions.filter((transaction) => new Date(date).setHours(0, 0, 0, 0) <= new Date(transaction.date).setHours(0, 0, 0, 0) && 
        new Date(transaction.date).setHours(0, 0, 0, 0) <= new Date(endDate).setHours(0, 0, 0, 0)
      )
      const expenses = filteredArray.reduce((prev, curr) => prev + curr.amount, 0);
      return expenses;
    })
    // convert datesArray to dateStrings 
    const labels = startDatesArray.map((date) => { 
      const startDay = date.toLocaleString('en-US', {day: '2-digit'});
      const startMonth = date.toLocaleString('en-US', {month: 'long'});
      const startYear = date.getFullYear(); 
      const startDateString = startDay + " " + startMonth + " " + startYear 
      const endDate = new Date(addMonths(new Date(date), 1))
      const endDay = endDate.toLocaleString('en-US', {day: '2-digit'});
      const endMonth = endDate.toLocaleString('en-US', {month: 'long'});
      const endYear = endDate.getFullYear();
      const endDateString = endDay + " " + endMonth + " " + endYear;
      const dateString = startDateString + " - " + endDateString;
      return dateString; 
    })

    const data = {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: expensesArray,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  
    return <Bar options={options} data={data} />
    

  } else if (recurrence === "Yearly") { 

    // convert numbersArray to an array of month periods 
    const startDatesArray = numbersArray.map((number) => { 
      const newDate = new Date(subtractYears(new Date(startDate), number));
      return newDate; 
    })

    console.log('Reached')

    // now we have an array of dates, we can map that into an array of sum of expenses for that category for each date
    const expensesArray = startDatesArray.map((date) => { 

      const endDate = new Date(addYears(new Date(date), 1));
      const filteredArray = filteredTransactions.filter((transaction) => new Date(date).setHours(0, 0, 0, 0) <= new Date(transaction.date).setHours(0, 0, 0, 0) && 
        new Date(transaction.date).setHours(0, 0, 0, 0) <= new Date(endDate).setHours(0, 0, 0, 0)
      )
      const expenses = filteredArray.reduce((prev, curr) => prev + curr.amount, 0);
      return expenses;
    })
    // convert datesArray to dateStrings 
    const labels = startDatesArray.map((date) => { 
      const startDay = date.toLocaleString('en-US', {day: '2-digit'});
      const startMonth = date.toLocaleString('en-US', {month: 'long'});
      const startYear = date.getFullYear(); 
      const startDateString = startDay + " " + startMonth + " " + startYear 
      const endDate = new Date(addYears(new Date(date), 1))
      const endDay = endDate.toLocaleString('en-US', {day: '2-digit'});
      const endMonth = endDate.toLocaleString('en-US', {month: 'long'});
      const endYear = endDate.getFullYear();
      const endDateString = endDay + " " + endMonth + " " + endYear;
      const dateString = startDateString + " - " + endDateString;
      return dateString; 
    })

    const data = {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: expensesArray,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  
    return <Bar options={options} data={data} />

  }

/*const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];*/

  

}

/* {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }, */