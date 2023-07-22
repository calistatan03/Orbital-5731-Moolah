import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../Login/LoginPage';
import axios from 'axios';
import { AuthContextProvider } from '../../context/AuthContext';

const MockLoginPage = () => { 
  return (
    <AuthContextProvider>
      <LoginPage/>
    </AuthContextProvider>
  )
}

describe("Login component", () => { 
  
  it("rendered component", () => { 
    const {getByTestId} = render(<MockLoginPage/>);
    const login = getByTestId("login-1")
    expect(login).toBeTruthy(); 
  });

  it("allows user to log in with email and password", async () => { 

    // Mock the axios.post method to simulate a successful login request
    jest.spyOn(axios, "post").mockResolvedValueOnce({ data: { success: true } });

    // Simulate user input 
    const {getByTestId} = render(<LoginPage/>);

    const emailInput = getByTestId("email");
    fireEvent.change(emailInput, {target: {value: "test@example.com"}})

    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    // Simulate form submission 
    const loginForm = getByTestId("login-form");
    fireEvent.submit(loginForm);

    // Wait for the login request to resolve
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert that the login request was made with the correct credentials
    expect(axios.post).toHaveBeenCalledWith("/api/user", {
      email: "test@example.com",
      password: "Password123!",
    });
  })

  it('displays an error message for invalid email address', () => {
    const { getByPlaceholderText, getByText } = render(<MockLoginPage />);

    // Get form elements
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    // Set invalid email and password
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Click the login button
    fireEvent.click(loginButton);

    // Assert that the error message is displayed
    expect(getByText('No account with given email found')).toBeInTheDocument();
  });

  it('displays an error message for incorrect password', () => {
    const { getByPlaceholderText, getByText } = render(<MockLoginPage />);

    // Get form elements
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    // Set valid email but incorrect password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrect_password' } });

    // Click the login button
    fireEvent.click(loginButton);

    // Assert that the error message is displayed
    expect(getByText('Incorrect password')).toBeInTheDocument();
  });

  it('displays an error message for missing email and password', () => {
    const { getByText } = render(<MockLoginPage />);

    // Get form element
    const loginButton = getByText('Sign In');

    // Click the login button without entering email and password
    fireEvent.click(loginButton);

    // Assert that the error message is displayed
    expect(getByText('No email or password provided!')).toBeInTheDocument();
  });


});
