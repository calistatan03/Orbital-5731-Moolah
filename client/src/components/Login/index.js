import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {login, error, isLoading} = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
		/*try {
			const url2 = "https://localhost:8080/api/auth/login";
			const url = "https://orbital-5731-moolah.onrender.com/api/auth/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
			
			// include snackbar message 

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		} */
	};

	return (
		<div data-testid="login-1" className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form data-testid="login-form" className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Moolah!</h1>
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
						<button type="submit" className="green_btn">
							Sign In
						</button>
					</form>
				</div>
				<div className="right">
					<h1>Don't have an account?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

const Form = ({email, setEmail, password, setPassword}) => { 

}