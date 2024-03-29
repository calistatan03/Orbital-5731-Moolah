import './OwingDetails.css';
import { useState } from 'react';
import WhoOwesUser from './WhoOwesUser';
import UserOwes from './UserOwes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function OwingDetails() { 
  const {user} = useAuthContext();
  const queryClient = useQueryClient();

 
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
    refetchInterval: 1000, 
    refetchIntervalInBackground: true, 
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    placeholderData: [],  })

  
  // filter data 
  const userOwesData = billData.filter((bill) => bill.paidMember != "Me")
  const whoOwesUserData = billData.filter((bill) => bill.paidMember === "Me")

  return (
    <div className="container">
      <div className="split2">
        <div className="user-owes-who-card">
          <UserOwes userOwesData={userOwesData}/> 
        </div>
        <div className="who-owes-user-card">
          <WhoOwesUser whoOwesUserData={whoOwesUserData}/>
        </div>
      </div>
    </div>
  )







}
