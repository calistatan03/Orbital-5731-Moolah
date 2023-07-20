import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useSignup } from '../../hooks/useSignup';
import "./SignupPage.css";
import moolahlogo2 from '../../images/moolahlogo2.png'


export default function SignupPage() { 
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState(''); 
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('');
	const navigate = useNavigate();
	const {signup, error, isLoading} = useSignup(); 

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(firstName, lastName, email, password);
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
    <div className="auth-form-container">
      <div className="image">
      <img className="moolahbanner" src={moolahlogo2}/>
      </div>
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
							data-testid="firstName"
							type="text"
              placeholder="First Name"
              id="firstName"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							required
							className="input"
						/>
						<input
              id="lastName"
              placeholder="Last Name"
							data-testid="lastName"
							type="text"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
							required
							className="input"
						/>
						<input
							data-testid="email"
              placeholder="Email"
              id="email"
							type="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="input"
						/>
						<input
							data-testid="password"
              placeholder="Password"
              id="password"
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="input"
						/>
            {error && <div className="error_msg">{error}</div>}
						<button disabled={isLoading}  className="with-shadow" type="submit">
							Sign Up
						</button>
      </form>
     <p className="mt-2 text-center text-sm text-gray-600 mt-4">
            Already have an account? {' '}
            <Link to="/login" className="link_btn">
                Log in here
            </Link>
            </p>
    </div>
  )


}