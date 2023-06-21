import './UserOwes.css';
import { useState, useEffect } from 'react';
import UserOweItem from './UserOweItem';

export default function UserOwes({userOwesWho}) { 
  const [data, setData] = useState([]);

  useEffect(() => {
    setDataFunction();
  })

  function setDataFunction() { 
    setData(userOwesWho);
  }

  function deleteBill(id) { 
    const newData = data.filter((object) => object._id !== id);
    setData(newData); 
  }


  return (
    <div className="main_container">
      <h1>Owed By You</h1>
      <ul className="bill-list">
        {data.map((billData) => { 
          return (
            <UserOweItem onDeleteBill={deleteBill} billData={billData} />
          )
      })}

      </ul>
      



    </div>

  )





}