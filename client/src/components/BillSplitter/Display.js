import NavBar from "../NavBar/NavBar";
import OpenForm from "./OpenForm";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OwingDetails from './OwingDetails';
import './Display.css';
import {useAuthContext} from '../../hooks/useAuthContext'


export default function Display() { 

  const {user} = useAuthContext(); 

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const [bills, setBills] = useState([]);

  

  async function fetchData() {
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
  }
 
  const handleSaveBillData = (newBillData) => {
    setBills((prevBills) => [...prevBills, newBillData]);
  };  


  return ( 
    <div>
      <NavBar/>
      <div className="owing_details">
        <OwingDetails bills={bills}/> 
      </div>
      <div className="add_new_bill">
        <OpenForm/>
      </div>
    </div>
  )
}
