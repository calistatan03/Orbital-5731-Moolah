import NavBar from "../NavBar/NavBar";
import OpenForm from "./OpenForm";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OwingDetails from './OwingDetails';
import './Display.css';

export default function Display() { 

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8080/api/add-bill');
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
      <div className="add_new_bill">
        <OpenForm/>
      </div>
      <div className="owing_details">
        <OwingDetails bills={bills}/> 
      </div>
        

    </div>
  )
}