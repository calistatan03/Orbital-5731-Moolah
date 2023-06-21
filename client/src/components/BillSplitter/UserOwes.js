import './UserOwes.css';
import { useState } from 'react';
import UserOweItem from './UserOweItem';

export default function UserOwes({userOwesWho}) { 
  

  return (
    <div className="main_container">
      <h1>Owed By You</h1>
      <ul className="bill-list">
        {userOwesWho.map((billData) => { 
          return (
            <UserOweItem billData={billData} />
          )
      })}

      </ul>
      



    </div>

  )





}