import './UserOwes.css';
import { useState, useEffect } from 'react';
import UserOweItem from './UserOweItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { toast } from 'react-toastify';

export default function UserOwes({userOwesData}) { 
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);

  useEffect(() => { 
    setData(userOwesData);
  }, [userOwesData])

  // fetch bill data 
  const { data: billData, isLoading, isError } = useQuery(["bills"], () => { 
    const url2 = 'http://localhost:8080/api/add-bill';
    const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
    return axios.get(url, { 
    headers: { 
      'Authorization': `Bearer ${user.token}`
    }
  }).then(res => res.data);
  }, { 
    refetchInternal: 1000,
    placeholderData: [],  })

  // const filteredData = data.filter((bill) => bill.paidMember != "Me");

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
      <h1>Owed By You</h1>
      <div className="no_bill_msg">
        <h3>You don't owe anyone money. Yay!</h3>
      </div>
    </div>
  )
  }

  return (
    <div className="main_container">
      <h1>Owed By You</h1>
      <div className="bills_container with-shadow">
         <ul className="bill-list">
        {data.map((billData) => { 
          return (
            <UserOweItem onDeleteBill={deleteBill} billData={billData} />
          )
      })}
      </ul>
      </div>
     
      
    </div>

  )





}
