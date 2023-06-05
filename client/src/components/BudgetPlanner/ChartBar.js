import './ChartBar.css';
import { useState } from 'react';

export default function ChartBar(props) { 
  const [filledAmount, setFilledAmount] = useState(0); 

  let barFillHeight = '0%';

  function onAddBudgetChart(props) { 

  }

  if (props.maxValue > 0) { 
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }

  return <div className="chart-bar">
    <div className="chart-bar__inner">
      <div className="chart-bar__fill"
        style={{ height: barFillHeight }}>
      </div>
    </div>
    <div className="chart-bar__label">
      {props.label}
    </div>
  </div>

}