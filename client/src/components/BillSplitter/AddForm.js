import NavBar from "../NavBar/NavBar";
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './AddForm.css';



export default function AddForm() { 

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredNumOfMembers, setEnteredNumOfMembers] = useState(0); 
  const [memberNames, setMemberNames] = useState([{memberName: ""}]);
  const [paidMember, setPaidMember] = useState("");
  //const [memberNameList, setMemberNameList] = useState([{memberName: "Me"}])

  function titleChangeHandler(event) { 
    setEnteredTitle(event.target.value);
  }

  function amountChangeHandler(event) { 
    setEnteredAmount(event.target.value); 
  }

  function numChangeHandler(event) { 
    setEnteredNumOfMembers(event.target.value); 
  }

  function submitHandler(event) { 
    event.preventDefault();
    console.log(memberNames);

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
  memberNames.forEach((element) => { 
    options.push(<option value={element.memberName}>{element.memberName}</option>)
  })


  return (
    <div>
      <NavBar/>
      <div className="form-card">
      <form className="form">
        <div className="bill-title">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleChangeHandler}/>
        </div>

        <div className="amount-spent">
          <label>Amount</label>
          <input 
            type="number" 
            min="0.01" step="0.01" 
            value={enteredAmount} 
            onChange={amountChangeHandler} />
        </div>

        <div className="numOfMembers">
          <label>Number of Members</label>
          <input 
            type="number"
            min="1"
            step="1"
            value = {enteredNumOfMembers}
            onChange={numChangeHandler} />
        </div>

        <label>Name of Member</label>
        {memberNames.map((memberNames, index) => (
          <div key={index}>
            <input 
              name="memberName"
              type="text"
              onChange={event => addMemberHandler(event, index)}/>
            <button onClick={() => deleteMemberHandler(index)} className="delete" type="button"><DeleteOutlineIcon/></button>
            <button onClick={addAnotherMemberHandler} className="add" type="button">Add Another Member</button>
          </div>
        ))}

        <div className="dropdown">
          <label>Paid By</label>
          <select id="paidMemberDropdown"
            value={paidMember}
            onChange={paidMemberChangeHandler}
            style={{ width: '20rem', height: '2.5rem' }}>
              <option value="me">Me</option>
              {options}
          </select>
        </div>

        <div className="actions">
          <Link to="/billsplitter">
          <button type="button" className="cancel">
            Cancel
          </button>
          </Link>
          <button className="submit" type='submit' onClick={submitHandler}>Split Bill</button>
        </div>


      </form>
      </div>
    </div>
  )

}