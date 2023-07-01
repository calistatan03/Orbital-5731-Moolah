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
      const url2 = 'https://localhost:8080/api/add-bill';
      const url = 'https://orbital-5731-moolah.onrender.com/api/add-bill';
      const response = await axios.get(url2);
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
