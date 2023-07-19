import './UserOweItem.css';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function UserOweItem({onDeleteBill, billData}) { 
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to settle', 
      message: `Are you sure that you have paid ${paidMember} $${amount}?`,
      buttons: [
        { 
          label: 'Yes',
          onClick: () => {onDeleteBill(billData._id)},
        },
        {
          label: 'No', 
        }
      ]
    })
  };
  const [openModal, setOpenModal] = useState(false);

  const amount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(billData.amount)
  const date = new Date(billData.date); 
  const month = date.toLocaleString('en-US', {month: 'long'});
  const day = date.toLocaleString('en-US', {day: '2-digit'});
  const year = date.getFullYear(); 
  const title = billData.title; 
  const paidMember = billData.paidMember; 

  return ( 
    <div className="user-owe-item-container">
      <li className="list">
        <div className="item_card">
          <span className="date">
          <div className="date_container">
            <div className="day">{day}</div>
            <div className="month">{month}</div>
            <div className="year">{year}</div>
          </div>
        </span>
        <span className="title_and_date">
          <div className="title">{title}</div>
          <div className="owe-message">You owe {paidMember} ${amount}</div>
        </span>
        <span><div className="paid_button_container"><button className="paid_button" onClick={() => handleDelete(billData._id)}>Settle<DoneIcon style={{fontSize: '1rem'}}/></button></div></span>
        </div>
      </li>

    </div>
  )

}