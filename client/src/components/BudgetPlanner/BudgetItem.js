import "./BudgetItem.css";

// props should be a single budget object 
export default function BudgetItem({budget}) { 
  return (
    <>
      <li>
        <div className="card">
          <div className="budget_item_category">
            <h2>{budget.category}</h2>
          </div>
          <div className='budget_item_amount'>
            <h2>${budget.amount}</h2>
          </div>
        </div>
      </li>
    </>
  )

}