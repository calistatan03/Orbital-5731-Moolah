import NavBar from "../../NavBar/NavBar";
import OpenForm from "../AddBill/OpenForm";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OwingDetails from './OwingDetails';
import './Display.css';
import { useQuery } from '@tanstack/react-query';
import {useAuthContext} from '../../../hooks/useAuthContext'
import Stats from "./Stats";

export default function Display() { 
  const {user} = useAuthContext(); 

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

  
  return ( 
    <div>
      <NavBar/>
      <div className="statistics"> 
        <Stats/>
      </div>
      <div className="owing_details">
        <OwingDetails/> 
      </div>
      <div className="add_new_bill">
        <OpenForm/>
      </div>
    </div>
  )
}
