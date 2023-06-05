import "./HomePage.css";
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function HomePage() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<NavBar/>
			<div className="welcome_message">
				<h1>Welcome back! </h1>
				<p>Ok oops we can style this more as we move on haha idk what to put
					on the home page. hahah
				</p>
			</div>
	
		</div>
	);
};
