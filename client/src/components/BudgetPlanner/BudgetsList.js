import BudgetItem from './BudgetItem';
import ChartBar from './ChartBar';
import './BudgetsList.css';
import { useEffect, useState, useContext } from 'react'; 
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { BudgetsContext } from '../../context/BudgetsContext';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import './BudgetItem.css';
import { BiTrash } from 'react-icons/bi';
import { purple } from '@mui/material/colors';
import { addDays, addWeeks, addMonths, addYears, durationInMonths, durationInYears } from "@progress/kendo-date-math";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BudgetsList({budgetData}) { 

  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [budgets, setBudgets] = useState([])

  useEffect(() => {setBudgets(budgetData); budgets.forEach(checkDateValidity)}, [budgetData])
  
  //const { budgets, setBudgets} = useContext(BudgetsContext);

  const deleteBudgetFunction = (id) => { 
    const url2 = 'https://localhost:8080/api/add-budget/${id}';
    const url = 'https://orbital-5731-moolah.onrender.com/api/add-budget/${id}';
    return axios.delete(url, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    });
  }

  const text="No budgets set yet. Set one now!"

  async function deleteBudget(id) { 
    const url2 = 'https://localhost:8080/api/add-budget/${id}';
    const url = `https://orbital-5731-moolah.onrender.com/api/add-budget/${id}`;
    await axios.delete(url, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    }).then(() => { 
      setBudgets(budgets.filter((budget) => budget._id !== id));
      toast.success('Budget deleted successfully!')
    })
  }
 /*
    { 
      onSuccess: () => { 
        queryClient.invalidateQueries(['budgets'])
      }
    }; */

  // check validity of data based on date 
  function checkDateValidity(budget) { 
    if (new Date(budget.endDate) < new Date(Date())) { 
      console.log('Function reached')
    // if endDate is not valid -> update startDate and endDate
      const numOfDays = durationInDays(new Date(budget.endDate), new Date())
      const numOfWeeks = durationInWeeks(new Date(budget.endDate), new Date())
      const numOfMonths = durationInMonths(new Date(budget.endDate), new Date())
      const numOfYears = durationInYears(new Date(budget.endDate), new Date())
      const endDate = (budget.recurrence === "Daily") ? addDays(new Date(budget.endDate), numOfDays + 1) : 
        budget.recurrence === "Weekly" ? addWeeks(new Date(budget.endDate), numOfWeeks) : 
        budget.recurrence === "Monthly" ? addMonths(new Date(budget.endDate), numOfMonths) : 
        addYears(new Date(budget.endDate), numOfYears)
      const startDate = (budget.recurrence === "Daily") ? addDays(new Date(budget.endDate), numOfDays) : 
        budget.recurrence === "Weekly" ? addWeeks(new Date(budget.endDate), numOfWeeks - 1) : 
        budget.recurrence === "Monthly" ? addMonths(new Date(budget.endDate), numOfMonths - 1) : 
        addYears(new Date(budget.endDate), numOfYears - 1)

      const updatedBudget = {startDate: startDate, endDate: endDate}
      try { 
        const url2 = 'https://localhost:8080/api/add-budget/${budget._id}';
        const url = `https://orbital-5731-moolah.onrender.com/api/add-budget/${budget._id}`;
        const response =  axios.patch(url, updatedBudget, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      });
      console.log('Successfully updated')
      } catch (error) { 
        console.log(error)
      }
    } 
  }



  function durationInWeeks(d1, d2) { 
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
  }

  function durationInDays(d1, d2) { 
    return Math.round((d2 - d1) / (24 * 60 * 60 * 1000))

  }

  /*const handleDelete = async (id) => {
    try {
      const url2 = 'https://localhost:8080/api/add-bill';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
      await axios.delete(`https://localhost:8080/api/add-budget/${id}`);
      setBudgetData((prevBudgets) =>
      prevBudgets.filter((budget) => budget._id !== id)
    );
      // Fetch updated transactions after deletion
      const response = await axios.get('https://orbital-5731-moolah.onrender.com/api/add-transaction');
      const updatedTransactions = response.data;
      setTransactionList(updatedTransactions);
    } catch (error) {
      console.error(error);
    }
  };*/


  if (budgetData.length === 0) { 
    return <div className="main_container">
      <div className="header">
          <h1>Existing Budgets</h1>
        </div>
        <div className="no_budgets">
          <h2>You have no budgets set yet. Set one now!</h2>
        </div>
    </div>
  }


    return (
      <div className="main_container">
        <div>
          <h1>Existing Budgets</h1>
        </div>
        <div>
          <ul className="budgetlist">
          {budgets.map((budget) => { 
            return <BudgetItem onDeleteBudget={deleteBudget} budget={budget} />
        })}
        </ul>
        </div>
      </div>
  )

  }


  // <BudgetItem className="description" budget={budget} onDeleteBudget={deleteBudget}/>
