import './OwingDetails.css';
import { useState } from 'react';
import WhoOwesUser from './WhoOwesUser';
import UserOwes from './UserOwes';

export default function OwingDetails({bills}) { 

  const [billList, setBillList] = useState(bills); 

  // array of bills 
  const whoOwesUser = bills.filter((bill) => bill.paidMember === "Me");
  const userOwesWho = bills.filter((bill) => bill.paidMember !== "Me");

  // allow users to mark bill as resolved/paid (aka delete) 



  return (
    <div className="container">
      <div className="split2">
        <div className="who-user-owes">
          <h1>Owed by You</h1>
          <UserOwes userOwesWho={userOwesWho}/> 
        </div>
        <div className="who-owes-user">
          <h1>Who Owes You</h1>
          <WhoOwesUser whoOwesUser={whoOwesUser}/>
        </div>
      </div>
    </div>
  )







}