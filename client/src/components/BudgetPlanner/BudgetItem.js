import "./BudgetItem.css";
import { purple } from '@mui/material/colors';
import ChartBar from './ChartBar';
import { BiTrash } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; 
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateBudget } from "../../hooks/useUpdateBudgets";
import { addDays, addWeeks, addMonths, addYears } from "@progress/kendo-date-math";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BudgetStats from "./BudgetStats";


// props should be a single budget object 
export default function BudgetItem({budget, onDeleteBudget}) {

  const [budgetData, setBudgetData] = useState([])
  const { user } = useAuthContext();
  const today = Date();
  const category = budget.category; 
  const [expand, setExpand] = useState(false);
  const [minimise, setMinimise] = useState(false);

  const deleteBudget = (id) => { 
    onDeleteBudget(id);
  }

  useEffect(() => { 
    setBudgetData(budget);
  }, [budget])

  // fetch specific budget 
  const { data: budgetItemData, isLoading} = useQuery(['budgetItem'], () => { 
    const url2=`http://localhost:8080/api/add-transaction/${budget._id}`
    const url = `https://orbital-5731-moolah.onrender.com/api/add-transaction/${budget._id}`
    return axios.get(url, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => res.data);
  }, { 
    placeholderData: [],
    refetchInterval: 1000, 
    refetchIntervalInBackground: true
  })

    // fetch transactionData 
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

  const filteredTransactions = transactionData.filter((transaction) => 
      transaction.category === budget.category).filter((transaction) =>new Date(budget.startDate) <= new Date(transaction.date) && new Date(transaction.date) <= new Date(budget.endDate))

  if (expand === true ) { 
    return ( 
      <div className="item_container_outer">
        <div className="item_container_expanded">
          <span className="budget_details">
          <div className="card">
            <div className="budget_item_category">
              <h2>{budget.category}</h2>
            </div>
            <div className='budget_item_amount'>
              <h2>${budget.amount}</h2>
            </div>
          </div>
        </span>
        <span className="progress_bar">
           <ChartBar filteredTransactions = {filteredTransactions} budget={budget}/> 
        </span>
        <span className="statistics_span">
          <button onClick={() => setExpand(false)} className="statistics_btn">View Statistics <ExpandLessIcon/></button>
        </span>
        <span className="delete-icon" onClick={() => deleteBudget(budget._id)}>
          <BiTrash></BiTrash>
        </span>
        </div>
        <div className="statistics with-shadow"> 
          <BudgetStats className="budgetStats" width={"100%"} budgetItemData={budget}/>
        </div>
    </div>
    )
  }
  return (

    <div className="item_container">
        <span className="budget_details">
          <div className="card">
            <div className="budget_item_category">
              <h2>{budget.category}</h2>
            </div>
            <div className='budget_item_amount'>
              <h2>${budget.amount}</h2>
            </div>
          </div>
        </span>
        <span className="progress_bar">
           <ChartBar filteredTransactions = {filteredTransactions} budget={budget}/> 
        </span>
        <span className="statistics_span">
          <button onClick={() => setExpand(true)} className="statistics_btn with-shadow">View Statistics <ExpandMoreIcon/></button>
        </span>
        <span className="delete-icon" onClick={() => deleteBudget(budget._id)}>
          <BiTrash></BiTrash>
        </span>


    </div>
      
  )
  

}
