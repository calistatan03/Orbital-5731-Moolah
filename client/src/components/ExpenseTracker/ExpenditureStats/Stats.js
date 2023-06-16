import { Form, Modal, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../../HomePage/HomePage.css';
import NavBar from '../../NavBar/NavBar';
import './Stats.css'; 
import DoughnutChart from './Doughnut';
import {useForm} from 'react-hook-form';
import AddForm from '../AddTransaction/AddForm';

export default function Stats() {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <div className="main_container">
		<NavBar/>
            <div className="doughnutchart">
            <DoughnutChart></DoughnutChart>
            </div>
		</div>
  )
}