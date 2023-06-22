import './UserOwes.css';
import { useState } from 'react';
import WhoOwesUserItem from './WhoOwesUserItem';
import WhoOwesUserGroup from './WhoOwesUserGroup';

export default function WhoOwesUser({whoOwesUser}) { 


  return (
    <div className="main_container">
      <h1>Who Owes You</h1>
      <ul className="bill-list">
        {whoOwesUser.map((billData) => { 
          return (
            <WhoOwesUserGroup 
            billData={billData}
            />
          )
        })}
      </ul>
      
    </div>

  )





}