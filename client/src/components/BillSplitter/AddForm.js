import NavBar from "../NavBar/NavBar";
import  { useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import './AddForm.css';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import {useAuthContext} from '../../hooks/useAuthContext';

export default function AddForm() { 

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredNumOfMembers, setEnteredNumOfMembers] = useState(0); 
  const [memberNames, setMemberNames] = useState([{memberName: ""}]);
  const [paidMember, setPaidMember] = useState("");
  const [enteredDate, setEnteredDate] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuthContext(); 
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
  }

  async function submitHandler(event) { 
    event.preventDefault();


    const billData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
      numOfMembers: enteredNumOfMembers,
      memberNames: memberNames, 
      paidMember: paidMember
    };

    console.log(billData); 

    try {

      const url2 = 'http://localhost:8080/api/add-bill';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
      const response = await axios.post(url2, billData, { 
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      });

      console.log(response);

      if (!response.ok) { 
        setError(response.error); 

      }

      if (response.ok) { 
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredNumOfMembers('');
        setEnteredDate('');
        setMemberNames([{memberName: "Me"}]);
        setPaidMember('');
      }
    } catch (error) {
      console.error(error);
    }

  }


  function deleteMemberHandler(index) { 
    const values = [...memberNames];
    values.splice(index, 1); 
    setMemberNames(values); 
  }

  function addAnotherMemberHandler(){ 
    setMemberNames([...memberNames, {memberName:''}])
  }

  function addMemberHandler(event, index) { 
    const values = [...memberNames];
    values[index][event.target.name] = event.target.value; 
    setMemberNames(values); 

  }

  function paidMemberChangeHandler(event) { 
    setPaidMember(event.target.value);
  }

  const options = []; 
  if (memberNames.length > 0) { 
    memberNames.forEach((element) => { 
    options.push(<option value={element.memberName}>{element.memberName}</option>)
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
          <input className="form-input with-shadow" type="text" value={enteredTitle} onChange={titleChangeHandler}/>
        </div>

        <div className="new-bill__controls">
          <label>Amount</label>
          <input 
            type="number" 
            className="form-input with-shadow"
            min="0.01" step="0.01" 
            value={enteredAmount} 
            onChange={amountChangeHandler} />
        </div>

        <div className="new-bill__controls">
          <label>Date</label>
          <input 
            type="date"
            className="form-input with-shadow"
            min="2000-01-01"
            max="2030-01-01" 
            value={enteredDate}
            onChange={dateChangeHandler}/>
        </div>

        <div className="new-bill__controls">
          <label>Number of Members</label>
          <input 
            type="number"
            className="form-input with-shadow"
            min="1"
            step="1"
            value = {enteredNumOfMembers}
            onChange={numChangeHandler} />
        </div>

        <div className="new-bill__control">
        <label>Name of Member</label>
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
        </div>

        <div className="new-bill__controls">
          <label>Paid By</label>
          <select id="paidMemberDropdown"
            value={paidMember}
            className="form-input with-shadow"
            onChange={paidMemberChangeHandler}
            style={{ width: '20rem', height: '2.5rem' }}>
              <option value="" disabled selected>Select member</option>
              <option value="Me">Me</option>
              {options}
          </select>
        </div>

        <div className="actions">
          <Link to="/billsplitter">
          <button type="button" className="cancel_btn">
            Cancel
          </button>
          </Link>
          <button className="submit_btn" type='submit' onClick={submitHandler}>Split Bill</button>
        </div>

      </form>
      </div>
    </div>
  )

}
