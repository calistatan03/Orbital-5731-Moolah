import './UserOweItem.css';

export default function UserOweItem({onDeleteBill, billData}) { 
  const handleDelete = (id) => {
      onDeleteBill(id);
  };

  const amountToPay = (billData.amount / billData.numOfMembers).toFixed(2);
  const date = new Date(billData.date); 
  const month = date.toLocaleString('en-US', {month: 'long'});
  const day = date.toLocaleString('en-US', {day: '2-digit'});
  const year = date.getFullYear(); 
  const title = billData.title; 
  const paidMember = billData.paidMember; 

  return ( 
    <div className="container">
      <li className="list">
        <span className="date">
          <div className="date_container">
            <div className="day">{day}</div>
            <div className="month">{month}</div>
            <div className="year">{year}</div>
          </div>
        </span>
        <span className="title_and_date">
          <div className="title">{title}</div>
          <div className="owe-message">You owe {paidMember} ${amountToPay}</div>
        </span>
        <span><div className="paid_button_container"><button onClick={() => handleDelete(billData._id)} className="paid_button">Paid!</button></div></span>
      </li>

    </div>
  )


}