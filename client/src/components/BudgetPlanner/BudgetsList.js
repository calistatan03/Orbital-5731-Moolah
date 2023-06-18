import BudgetItem from './BudgetItem';
import ChartBar from './ChartBar';
import './BudgetsList.css';
import { useEffect, useState } from 'react'; 

export default function BudgetsList(props) { 
  const [budgets, setBudgets] = useState(null);

  useEffect(() => { 
    const fetchBudgets = async () => { 
      const response = await fetch("http://localhost:8080/api/budgetplanner")
      const json = await response.json()

      if (response.ok) { 
        setBudgets(json)
      }
    }

    fetchBudgets()

  }, [])

  return (
    <div className="List">
      <div className="budgets">
        {budgets && budgets.map(() => (
          <p key={budgets.category}>{budgets.category}</p>
        ))}
      </div>
    </div>
  )


  

  /*if (props.items.length === 0) { 
    return <h2 className='budgets-list__fallback'>No budgets set yet. Set one today!</h2>
  };

  return ( 
    <ul className="budgets-list">
      {props.items.map((budget) => (<BudgetItem 
      key={budget.id}
      title={budget.category} 
      amount={budget.amount} />))}
    </ul>
  )
  */
}