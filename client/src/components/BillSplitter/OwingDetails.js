import './OwingDetails.css';
import { useState } from 'react';
import WhoOwesUser from './WhoOwesUser';
import UserOwes from './UserOwes';

export default function OwingDetails({bills}) { 

  const [billList, setBillList] = useState(bills); 

  // array of bills 
  const whoOwesUser = bills.filter((bill) => bill.paidMember === "Me");
  const userOwesWho = bills.filter((bill) => bill.paidMember != "Me");

  // allow users to mark bill as resolved/paid (aka delete) 




  return (
    <div className="container">
      <div className="split2">
        <div className="who-user-owes">
          <UserOwes userOwesWho={userOwesWho}/> 
        </div>
        <div className="who-owes-user">
          <WhoOwesUser whoOwesUser={whoOwesUser}/>
        </div>
      </div>
    </div>
  )







}