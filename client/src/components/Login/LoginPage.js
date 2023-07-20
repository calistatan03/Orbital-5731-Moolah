import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import moolahlogo2 from '../../images/moolahlogo2.png'

export default function LoginPage() { 
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
    <div class="auth-form-container"> 
    <div className="image">
      <img className="moolahbanner" src={moolahlogo2}/>
    </div>
    <h2>Login to Moolah!</h2>
        <form data-testid="login-form" className="login-form" onSubmit={handleSubmit}>
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
						<button type="submit" className="with-shadow">
							Sign In
						</button>
          </form>
          <p className="text text-center text-sm text-gray-600 mt-4">
            Don't have an account? {' '}
            <Link to="/signup" className="link_btn">
                Sign up here
            </Link>
            </p>
    </div>
  )


}