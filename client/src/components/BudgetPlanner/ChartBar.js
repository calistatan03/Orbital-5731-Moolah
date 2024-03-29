import { purple } from '@mui/material/colors';
import './ChartBar.css';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { addDays, addMonths, addYears } from '@progress/kendo-date-math';
import { useAuthContext } from '../../hooks/useAuthContext';

// props should be a single budget object
// find based on id? 
export default function ChartBar({filteredTransactions, budget}) { 
  const { user } = useAuthContext();
  const [filledAmount, setFilledAmount] = useState(0); 
  const [remainder, setRemainder] = useState(0);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const percentage = 100;
  const today = Date();
  const queryClient = useQueryClient()
  const startDate = new Date(budget.startDate); 
  const startMonth = startDate.toLocaleString('en-US', {month: 'long'});
  const startDay = startDate.toLocaleString('en-US', {day: '2-digit'});
  const startYear = startDate.getFullYear(); 
  const endDate = new Date(budget.endDate); 
  const endDay = endDate.toLocaleString('en-US', {day: '2-digit'});
  const endMonth = endDate.toLocaleString('en-US', {month: 'long'});
  const endYear = endDate.getFullYear(); 
  const [transactionData, setTransactionData] = useState([])

  // find expenses based on category => sum up ALL expenses.amount and present 
  // as fraction of total budget.amount 

  useEffect(() => { 
    setTransactionData(filteredTransactions);
    totalExpensesAmountFunction(); 
    
  }, [filteredTransactions])


  function totalExpensesAmountFunction() { 
    const totalExpensesAmount = filteredTransactions.reduce((prev, curr) => prev + curr.amount, 0);
    setTotalExpensesAmount(totalExpensesAmount.toFixed(2));
    const remainderAmount = budget.amount - totalExpensesAmount;
    const percentage = ((totalExpensesAmount / budget.amount) * 100).toFixed(1);
    console.log('Calculating total expenses amount')
  if (remainderAmount < 0) { 
    setRemainder(0);
    setFilledAmount(100);
  } else { 
    setRemainder(remainderAmount);
    setFilledAmount(percentage);
  }
  } 

    const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 30
  }

  const fillerStyles = {
    height: '100%',
    width: `${filledAmount}%`,
    backgroundColor: "#6a5acd",
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'inherit'
  }


  return (
  <div className="chart_bar_container">
    <div className="remaining">
      <h2>Remaining ${(budget.amount - totalExpensesAmount) < 0 ? 0 : (budget.amount - totalExpensesAmount)}</h2>
    </div>
    <div className="chart-bar">
      <div className="chart-bar__outer with-shadow" style={containerStyles}>
        <div className="chart-bar__fill"
          style={fillerStyles}>
            <span style={labelStyles}>
              {((totalExpensesAmount / budget.amount) * 100).toFixed(1) > 100 ? 100 : ((totalExpensesAmount / budget.amount) * 100).toFixed(1)}%
            </span>
        </div>
      </div>
    </div>
    <div className="timeline">
      <h3 className="startDate">{startDay} {startMonth}, {startYear}</h3>
      <h3 className="endDate">{endDay} {endMonth}, {endYear}</h3>

    </div>
    <div className="howmuch_outof_howmuch">
      <h3>${totalExpensesAmount} of ${budget.amount} spent</h3>
    </div>
  </div>
  )

}

  /*if (props.maxValue > 0) { 
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }*/