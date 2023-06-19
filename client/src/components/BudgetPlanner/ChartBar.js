import { purple } from '@mui/material/colors';
import './ChartBar.css';
import { useState } from 'react';

// props should be a single budget object
// find based on id? 
export default function ChartBar({budget}) { 
  const [filledAmount, setFilledAmount] = useState(0); 

  // find expenses based on category => sum up ALL expenses.amount and present 
  // as fraction of total budget.amount 


    const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 30
  }

  const fillerStyles = {
    height: '100%',
    width: `20%`,
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


  let barFillHeight = '0%';

  return (<div className="container">
    <div className="remaining">
      <h2>Remaining ${budget.amount}</h2>
    </div>
    <div className="chart-bar">
      <div className="chhart-bar__outer" style={containerStyles}>
        <div className="chart-bar__fill"
          style={fillerStyles}>
            <span style={labelStyles}>20%</span>
        </div>
      </div>
  </div>
  </div>)

}

  /*if (props.maxValue > 0) { 
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }*/