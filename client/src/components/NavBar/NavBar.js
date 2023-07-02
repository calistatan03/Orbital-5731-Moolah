import { Link } from 'react-router-dom';
import './NavBar.css';
import { useLogout } from '../../hooks/useLogout'
import moolahlogo from '../../images/moolahlogo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthContext} from '../../hooks/useAuthContext';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavBar() {

	const [open, setOpen] = useState(false); 

	const {user} = useAuthContext();

	const { logout } = useLogout()
	
	const handleLogout = () => {
		logout();
	};

 function Dropdown() { 
	const [dropdown, setDropdown] = useState(false); 

  return ( 
    <>
    <ul 
			className={dropdown ? "dropdown-submenu clicked" : "dropdown-submenu"}
			onClick={() => setDropdown(true)}> 
      <a><li className="submenu-item"><Link to="/profile" onClick={() => setDropdown(false)}>Profile</Link></li></a>
      <a><li className="submenu-item" onClick={handleLogout}>Log out</li></a>
    </ul>
    </>
  )
}


	return (
		<div className="main_container">
			<nav className="navbar">
					<Link to="/" className="link_to_homepage">
					<div className="moolah-title">Moolah!
						<img src={moolahlogo} alt="Logo" className="moolahlogo" />
					</div>
				</Link>

				<div className="navbar-links">
					<ul className="list_of_links"> 
						<li><Link to= "/expensetracker">Expense Tracker</Link></li>
						<li><Link to="/budgetplanner">Budget Planner</Link></li>
						<li><Link to="/billsplitter">Bill Splitter</Link></li> 
						<li><div className="dropdown"><button className="dropbtn"><AccountCircleIcon/>
						{user.firstName} {user.lastName}</button>
							<div className="dropdown-content">
								<li><div className="profile"><Link className="profile_link" to="/profile"><h3>Profile</h3></Link></div></li>
								<li><div className="logout" onClick={handleLogout}><h3>Log out</h3></div></li>
							</div>
						</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

/*
						<li><button className="logout_button" onClick={handleLogout}>
							<LogoutIcon/>
						</button>
						</li>



						<li className="account" onClick={() => setOpen(true)}><AccountCircleIcon/>
						{user.firstName} {user.lastName} 
						{open && <Dropdown/>}</li>
						*/ 