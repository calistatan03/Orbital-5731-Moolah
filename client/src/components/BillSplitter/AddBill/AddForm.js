import NavBar from "../../NavBar/NavBar";
import  { useState, useEffect } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import './AddForm.css';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import {useAuthContext} from '../../../hooks/useAuthContext';
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddForm() { 

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredNumOfMembers, setEnteredNumOfMembers] = useState(0); 
  const [memberNames, setMemberNames] = useState([]);
  const [paidMember, setPaidMember] = useState("");
  const [enteredDate, setEnteredDate] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuthContext(); 
  const [formErrors, setFormErrors] = useState({})
  //const [memberNameList, setMemberNameList] = useState([{memberName: "Me"}])
  

  function titleChangeHandler(event) { 
    setEnteredTitle(event.target.value);
  }

  function amountChangeHandler(event) { 
    setEnteredAmount(event.target.value);
    
  }

  function dateChangeHandler(event) { 
    setEnteredDate(event.target.value); 
  }

  function numChangeHandler(event) { 
    setEnteredNumOfMembers(event.target.value); 
    if (enteredNumOfMembers <= 1 ) { 
      setMemberNames([]);
    }
  }

  const validate = () => { 
    const errors = {};

    // check title 
    if (!enteredTitle) { 
      errors.title = "Title is required!"
    } 

    // check amount
    if (enteredAmount === 0) { 
      errors.amount = "Amount cannot be $0!"
    }

    // check date 
    if (!enteredDate) { 
      errors.date = "Date is required!"
    }

    // check number of members 
    if (enteredNumOfMembers <= 1) { 
      errors.numOfMembers = "There must be at least 2 members in the group!"
    }

    // check names of members 
    if (memberNames.length != enteredNumOfMembers-1) { 
      errors.memberNames = "All member names must be provided!"
    }

    // check for paid member 
    if (!paidMember) { 
      errors.paidMember = "Select a member!"
    }

    return errors;
    
  }

  async function submitHandler(event) { 
    event.preventDefault();
    setFormErrors(validate())

    
    // user paid for bill, others owe him/her 
    if (paidMember === "Me") { 
      
      // iterating through the memberNames array to add new properties to each object 
      const updatedMemberNames = memberNames.map((element) => ({
        title: enteredTitle, 
        amount: +(+enteredAmount / enteredNumOfMembers).toFixed(2),
        date: new Date(enteredDate),
        paidMember: paidMember,
        memberName: element}) 
    
      )

      await Promise.all(updatedMemberNames.map(async (element) => { 
        try { 
        const url2 = 'http://localhost:8080/api/add-bill';
        const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
        const response =  await axios.post(url, element, { 
          headers: { 
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.status >= 200) { 
          setEnteredTitle('');
          setEnteredAmount('');
          setEnteredNumOfMembers('');
          setEnteredDate('');
          setMemberNames([]);
          setPaidMember('');
          toast.success('Bill added successfully!')
        }
      } catch (error) {
        console.error(error);
      }

      }))
      
    } else { 
      // user owes a certain person money 

      const billData = { 
        title: enteredTitle, 
        amount: +(+enteredAmount / enteredNumOfMembers).toFixed(2), 
        date: new Date(enteredDate),
        memberName: "Me",
        paidMember: paidMember
      }
      
      try { 
        const url2 = 'http://localhost:8080/api/add-bill';
        const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
        const response =  await axios.post(url, billData, { 
          headers: { 
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) { 
          setError(response.error); 
          console.log('Response not ok?')

        }

        if (response.status >= 200) { 
          setEnteredTitle('');
          setEnteredAmount('');
          setEnteredNumOfMembers('');
          setEnteredDate('');
          setMemberNames([]);
          setPaidMember('');
          toast.success('Bill added successfully!')
        }
      } catch (error) {
        console.error(error);
      }
    }
    }

    const fields = [];
    for (let i = 1; i < enteredNumOfMembers; i++ ) { 
      fields.push(<input 
              name="memberName"
              className="form-input with-shadow"
              type="text"
              required
              placeholder= 'Member Name'
              onChange={(event) => addMemberHandler(event, i) }
              />)
    }
  
  function addMemberHandler(event, i) { 
    const values = [...memberNames];
    values[i-1] = event.target.value;
    setMemberNames(values);
    console.log(values);
  }

  function paidMemberChangeHandler(event) { 
    setPaidMember(event.target.value);
  }

  const options = []; 
  if (memberNames.length > 0) { 
    memberNames.forEach((memberName) => { 
    options.push(<option value={memberName}>{memberName}</option>)
  })
  }

  return (
    <div>
      <NavBar/>
      <div className="form-card">
      <form className="form" onSubmit={submitHandler}>
        <div className="new-bill__controls">
          <h1>New Bill</h1>
          <label>Title</label>
          <input className="form-input with-shadow" type="text" value={enteredTitle} onChange={titleChangeHandler} />
          <div className="error_message"><p>{formErrors.title}</p></div>
        </div>

        <div className="new-bill__controls">
          <label>Amount</label>
          <input 
            type="number" 
            required
            className="form-input with-shadow"
            min="0.01" step="0.01" 
            value={enteredAmount} 
            onChange={amountChangeHandler} 
            />
            <div className="error_message"><p>{formErrors.amount}</p></div>
        </div>

        <div className="new-bill__controls">
          <label>Date</label>
          <input 
            type="date"
            required
            className="form-input with-shadow"
            min="2000-01-01"
            max="2030-01-01" 
            value={enteredDate}
            onChange={dateChangeHandler}
            />
            <div className="error_message"><p>{formErrors.date}</p></div>
        </div>

        <div className="new-bill__controls">
          <label>Number of Members</label>
          <input 
            type="number"
            required
            className="form-input with-shadow"
            min="1"
            step="1"
            value = {enteredNumOfMembers}
            onChange={numChangeHandler}
            />
          <div className="error_message"><p>{formErrors.numOfMembers}</p></div>
        </div>

        {enteredNumOfMembers > 1 ? <div className="new-bill__controls">
        <label>Name of Other Members</label>
          {fields}
          <div className="error_message"><p>{formErrors.memberNames}</p></div>
        </div> : <div></div> }

        <div className="new-bill__controls">
          <label>Paid By</label>
          <select id="paidMemberDropdown"
            value={paidMember}
            required
            className="form-input with-shadow"
            onChange={paidMemberChangeHandler}
            style={{ width: '20rem', height: '2.5rem' }}>
              <option value="" disabled selected>Select member</option>
              <option value="Me">Me</option>
              {options}
          </select>
          <div className="error_message"><p>{formErrors.paidMember}</p></div>
        </div>
        <div className="actions">
          <button className="submit_btn" type='submit' onClick={submitHandler}>Split Bill</button>
          <Link to="/billsplitter">
          <button type="button" className="cancel_btn">
            Back
          </button>
          </Link>
        </div>
      </form>
      </div>
    </div>
  )

}

/* 
{memberNames.length > 0 && memberNames.map((memberNames, index) => (
          <div key={index}>
            <input 
              name="memberName"
              className="form-input with-shadow"
              type="text"
              onChange={event => addMemberHandler(event, index)}/>
            <button onClick={() => deleteMemberHandler(index)} className="delete_btn" type="button"><RemoveIcon/></button>
            <button onClick={addAnotherMemberHandler} className="add_btn" type="button"><AddIcon/></button>
          </div>
        ))} 

 */
