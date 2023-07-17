import './BudgetForm.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import NavBar from "../NavBar/NavBar";
import BudgetsList from "./BudgetsList";
import { Link } from 'react-router-dom';
import {useAuthContext} from "../../hooks/useAuthContext";
import { addDays, addWeeks, addMonths, addYears, durationInMonths, durationInYears} from '@progress/kendo-date-math';

export default function BudgetForm(props) { 

  const {user} = useAuthContext();
  //const {budgets, dispatch} = useBudgetsContext(); 

  const [enteredCategory, setEnteredCategory] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredRecurrence, setEnteredRecurrence] = useState('Daily');
  const [enteredDate, setEnteredDate] = useState('');
  const [error, setError] = useState('');

  function categoryChangeHandler(event) {
    setEnteredCategory(event.target.value);
  };

  function recurrenceChangeHandler(event) { 
    setEnteredRecurrence(event.target.value);
  }

  function amountChangeHandler(event) { 
    setEnteredAmount(event.target.value);
  };

  function dateChangeHandler(event) { 
    setEnteredDate(event.target.value);
  }

  // submit post request and new budget data 
  async function submitHandler(event) { 
    event.preventDefault(); 

    if (user) { 

      const endDate = enteredRecurrence === "Daily" ? addDays(new Date(enteredDate), 1)  : 
      enteredRecurrence === "Weekly" ? addWeeks(new Date(enteredDate), 1) : 
      enteredRecurrence === "Monthly" ? addMonths(new Date(enteredDate), 1) : 
      addYears(new Date(enteredDate), 1)

      if (new Date(endDate) < new Date()) { 
        console.log('Function reached')
      // if endDate is not valid -> update startDate and endDate
        const numOfDays = durationInDays(new Date(endDate), new Date())
        const numOfWeeks = durationInWeeks(new Date(endDate), new Date())
        const numOfMonths = durationInMonths(new Date(endDate), new Date())
        const numOfYears = durationInYears(new Date(endDate), new Date())
        const newEndDate = (enteredRecurrence === "Daily") ? addDays(new Date(endDate), numOfDays + 1) : 
          enteredRecurrence === "Weekly" ? addWeeks(new Date(endDate), numOfWeeks) : 
          enteredRecurrence === "Monthly" ? addMonths(new Date(endDate), numOfMonths) : 
          addYears(new Date(endDate), numOfYears)
          console.log(new Date(newEndDate))
        const startDate = (enteredRecurrence === "Daily") ? addDays(new Date(endDate), numOfDays) : 
          enteredRecurrence === "Weekly" ? addWeeks(new Date(endDate), numOfWeeks - 1) : 
          enteredRecurrence === "Monthly" ? addMonths(new Date(endDate), numOfMonths - 1) : 
          addYears(new Date(endDate), numOfYears - 1)
        console.log(new Date(startDate))
          const budgetData = { 
            category: enteredCategory,
            amount: +enteredAmount,
            recurrence: enteredRecurrence,
            startDate: new Date(startDate.setHours(0, 0, 0, 0)), 
            endDate: new Date(newEndDate)
          };

        const response = await fetch('http://localhost:8080/api/add-budget', { 
          method: 'POST',
          body: JSON.stringify(budgetData),
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
    
    const json = await response.json() 

    if (!response.ok) { 
      setError(json.error) 
    }
    if (response.ok) { 
      setEnteredAmount('');
      setEnteredCategory('');
      setError(null);
      setEnteredDate('');
      setEnteredRecurrence('');
    }

      } else { 
        const budgetData = { 
          category: enteredCategory,
          amount: +enteredAmount,
          recurrence: enteredRecurrence,
          startDate: new Date(Date()).setHours(0, 0, 0, 0), 
          endDate: new Date(endDate)
        };

        const response = await fetch('http://localhost:8080/api/add-budget', { 
        method: 'POST',
        body: JSON.stringify(budgetData),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      
      const json = await response.json() 

      if (!response.ok) { 
        setError(json.error) 
      }
      if (response.ok) { 
        setEnteredAmount('');
        setEnteredCategory('');
        setError(null);
        setEnteredDate('');
        setEnteredRecurrence('');
      }
   }
    /*try { 


      const url2 = 'https://localhost:8080/api/add-budget';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-budget';
      const response = await axios.post(url2, budgetData); 
      console.log(response);

      //props.onSaveBudgetData(response.data);
      setEnteredAmount('');
      setEnteredCategory('');
      setError('');
      } catch (error) { 

    }*/

      } 

      //props.onSaveBudgetData(response.data);
  
  }

  function durationInWeeks(d1, d2) { 
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
  }

  function durationInDays(d1, d2) { 
    return Math.round((d2 - d1) / (24 * 60 * 60 * 1000))

  }

  return (
    <div>
      <NavBar/>
      <div className="budget-form_wrapper">
        <h1>New Budget</h1>
        <form className="budget-form" onSubmit={submitHandler}>
        <div className="new-budget__controls">
          <div className="new-budget__control">
            <label>Category</label>
            <input 
            placeholder="Groceries, Transport, Food..."
            type="text" 
            value={enteredCategory} 
            onChange={categoryChangeHandler}
            className="category_input with-shadow" />
          </div>
          <div className="new-budget__control">
            <label>Amount</label>
            <input type='number' 
              min="0.01" 
              step="0.01" 
              value={enteredAmount}
              onChange={amountChangeHandler}
              className="amount_input with-shadow"/>
          </div>
          <div className="new-budget__control"> 
            <label>Recurrence</label>
            <select id="recurrence"
            value={enteredRecurrence}
            className="recurrence_input with-shadow"
            onChange={recurrenceChangeHandler}
            style={{ width: '20rem', height: '2.5rem' }}> 
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="new-budget__control">
              <label>Start Date</label>
              <input 
            type="date"
            className="date-input with-shadow"
            min="2000-01-01"
            max="2030-01-01" 
            value={enteredDate}
            onChange={dateChangeHandler}/>

          </div>
        </div>
        <div className="new-budget__actions">
          <button className="submit" type='submit' onClick={submitHandler}>Add Budget</button>
          <Link to="/budgetplanner">
          <button type="button" className="view_budgets">
            View Budgets
          </button>
          </Link>
        </div>
      </form>
    </div>
  </div>
  
  )

}
