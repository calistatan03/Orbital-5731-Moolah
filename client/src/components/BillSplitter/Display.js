import NavBar from "../NavBar/NavBar";
import OpenForm from "./OpenForm";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OwingDetails from './OwingDetails';
import './Display.css';
import { useQuery } from '@tanstack/react-query';
import {useAuthContext} from '../../hooks/useAuthContext'

export default function Display() { 

  const {user} = useAuthContext(); 
  const [bills, setBills] = useState([]);

  const { data: billData, isLoading, isError } = useQuery(["bills"], () => { 
     return axios.get('http://localhost:8080/api/add-bill', { 
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => res.data);
  }, { 
    placeholderData: [],  });


  /*async function fetchData() {
    try {
      const url2 = 'http://localhost:8080/api/add-bill';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
      const response = await axios.get(url2, { 
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setBills(response.data);
    } catch (error) {
      console.error(error);
    }
  }*/
 
  const handleSaveBillData = (newBillData) => {
    setBills((prevBills) => [...prevBills, newBillData]);
  };  


  return ( 
    <div>
      <NavBar/>
      <div className="owing_details">
        <OwingDetails bills={billData}/> 
      </div>
      <div className="add_new_bill">
        <OpenForm/>
      </div>
    </div>
  )
}
