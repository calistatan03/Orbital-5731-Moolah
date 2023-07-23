import './UserOwes.css';
import './WhoOwesUser.css'
import { useState, useEffect } from 'react';
import WhoOwesUserItem from './WhoOwesUserItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { toast } from 'react-toastify';


export default function WhoOwesUser({whoOwesUserData}) { 
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [data, setData] = useState([])

  useEffect(() => { 
    setData(whoOwesUserData)
  }, [whoOwesUserData])

  async function deleteBill(id) { 
    const url2 = `http://localhost:8080/api/add-bill${id}`
    const url = `https://orbital-5731-moolah.onrender.com/api/add-bill/${id}`
    await axios.delete(url, { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    }).then(() => { 
      setData(data.filter((bill) => bill._id !== id));
      toast.success('Bill settled!')

    })
    
  }

  if (data.length === 0) { 
    return (
    <div className="main_container">
      <h1>Who Owes You</h1>
      <div className="no_bill_msg">
        <h3>No one owes you money. Yay!</h3>
      </div>
    </div>)
  }


  return (
    <div className="main_container">
      <h1>Who Owes You</h1>
      <div className="bills_container with-shadow">
        <ul className="bill-list">
        {data.map((billData) => { 
          return (
            <WhoOwesUserItem 
            onDeleteBill={deleteBill}
            billData={billData}
            />
          )
        })}
      </ul>
      

      </div>
      
    </div>

  )


}
