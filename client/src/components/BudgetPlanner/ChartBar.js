import { purple } from '@mui/material/colors';
import './ChartBar.css';
import { useState, useEffect } from 'react';

// props should be a single budget object
// find based on id? 
export default function ChartBar({filteredTransactions, budget}) { 
  const [filledAmount, setFilledAmount] = useState(0); 
  const [remainder, setRemainder] = useState(0);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const percentage = 100;

  // find expenses based on category => sum up ALL expenses.amount and present 
  // as fraction of total budget.amount 

  useEffect(() => { 
    totalExpensesAmountFunction(); 
  }, [])

  function totalExpensesAmountFunction() { 
    const totalExpensesAmount = filteredTransactions.reduce((prev, curr) => prev + curr.amount, 0);
    setTotalExpensesAmount(totalExpensesAmount.toFixed(2));
    const remainderAmount = budget.amount - totalExpensesAmount;
    const percentage = ((totalExpensesAmount / budget.amount) * 100).toFixed(1);
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
      <h2>Remaining ${remainder}</h2>
    </div>
    <div className="chart-bar">
      <div className="chart-bar__outer with-shadow" style={containerStyles}>
        <div className="chart-bar__fill"
          style={fillerStyles}>
            <span style={labelStyles}>
              {filledAmount}%
            </span>
        </div>
      </div>
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