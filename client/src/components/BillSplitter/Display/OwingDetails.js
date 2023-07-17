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
    return axios.get('http://localhost:8080/api/add-bill', { 
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

  // allow users to mark bill as resolved/paid (aka delete) 


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