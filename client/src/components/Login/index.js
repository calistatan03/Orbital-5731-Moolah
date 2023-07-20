import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import { useLogin } from '../../hooks/useLogin';
import Header from "./Header";

const fixedInputClass="rounded-md appearance-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"


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
		<>
		<div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
			<Header/>
			<form className="mt-8 space-y-6">
				<div className4="-space-y-px">
					<div className="my-5">
								<label className="sr-only">
								</label>
								<input
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									name="email"
									type="email"
									required
									className={fixedInputClass}
									placeholder="Email"
								/>
							</div>
					<div className="my-5">
								<label className="sr-only">
								</label>
								<input
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									name="password"
									type="password"
									required
									className={fixedInputClass}
									placeholder="Password"
								/>
							</div>
					</div>
			</form>
			</div>
			</div>
		</>
		
	);
};

/* 
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
			 */ 