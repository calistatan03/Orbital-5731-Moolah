import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, BrowserRouter } from "react-router-dom";
import "./index.css";

export default function Signup() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://orbital-5731-moolah.onrender.com/api/users";
			const { data: res } = await axios.post(url, data);
			const navigate = useNavigate();
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
		}
	};

	return (
		<BrowserRouter> 
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
							onChange={handleChange}
							value={data.firstName}
							required
							className="input"
						/>
						<input
							data-testid="last-name"
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="input"
						/>
						<input
							data-testid="email"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							data-testid="password"
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="sign_up_button">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
		</BrowserRouter>
	);
};
