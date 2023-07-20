import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from 'axios'; 
import { useAuthContext } from "../../../hooks/useAuthContext"; 
import './OwedStats.css';

export default function OwedStats() { 

  const queryClient = useQueryClient();
  const { user } = useAuthContext();

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

  const filteredData = billData.filter((bill) => bill.paidMember != "Me")
  const totalAmount = new Intl.NumberFormat('en-US', 
  { minimumFractionDigits: 2, 
    maximumFractionDigits: 2 }).format(filteredData.reduce((total, currentValue) => total = total + currentValue.amount, 0))
  

  return ( 
    <div> 
      <div className="total-amount-owed"> 
        <h1> Total Amount You Owe Others: </h1>
        <h2> ${totalAmount}</h2>
      </div>
      
    </div>
  )

}
