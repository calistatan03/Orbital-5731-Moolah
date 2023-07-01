import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState(''); 
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('');
	const navigate = useNavigate();
	const {signup, error, isLoading} = useSignup(); 

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(firstName, lastName, email, password)
		/*try {
	
			const url2 = "https://localhost:8080/api/users/signup";
			const url = "https://orbital-5731-moolah.onrender.com/api/users/signup";
			const { data: res } = await axios.post(url2, data);

			navigate("/login");
			
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}*/
	};

	return (

		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left_card">
					<><h1>Welcome Back</h1><Link to="/login">
						<button type="button" className="sign_in_button">
							Sign in
						</button>
					</Link></>
				</div>
				<div className="right">
					<form data-testid="signup-form" className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							data-testid="first-name"
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							required
							className="input"
						/>
						<input
							data-testid="last-name"
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
							required
							className="input"
						/>
						<input
							data-testid="email"
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="input"
						/>
						<input
							data-testid="password"
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button disabled={isLoading} type="submit" className="sign_up_button">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>

	);
};
