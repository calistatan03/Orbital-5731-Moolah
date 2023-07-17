import './WhoOwesUserItem.css';
import DoneIcon from '@mui/icons-material/Done';

export default function WhoOwesUserItem({billData, onDeleteBill}) { 
  const date = new Date(billData.date); 
  const month = date.toLocaleString('en-US', {month: 'long'});
  const day = date.toLocaleString('en-US', {day: '2-digit'});
  const year = date.getFullYear(); 

  const handleDelete = (id) => {
      onDeleteBill(id);
  };

  return ( 
    <div className="who-owes-user-container">
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
          <div className="title">{billData.title}</div>
          <div className="owe-message">{billData.memberName} owes you ${billData.amount}</div>
        </span>
        <span><div className="paid_button_container"><button className="paid_button" onClick={() => handleDelete(billData._id)}>Received<DoneIcon style={{fontSize: '1rem'}}/></button></div></span>
        </div>
      </li>

    </div>
  )






}