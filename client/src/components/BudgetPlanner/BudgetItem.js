import './BudgetItem.css'; 
import ChartBar from './ChartBar';

export default function BudgetItem(props) { 

  return ( 
    <div class="card" className='budget-item'>
      <div className='budget-item__description'> 
        <h2>{props.category}</h2>
        <div className='budget-item__amount'>${props.amount}</div>
      </div>
      <div className="budget_chart">
        <ChartBar/>
      </div>
    </div>
  )

}