import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login/index';
import axios from 'axios';

describe("Login component", () => { 
  
  it("rendered component", () => { 
    const {getByTestId} = render(<Login/>);
    const login = getByTestId("login-1")
    expect(login).toBeTruthy(); 
  });

  it("allows user to log in with email and password", async () => { 

    // Mock the axios.post method to simulate a successful login request
    jest.spyOn(axios, "post").mockResolvedValueOnce({ data: { success: true } });

    // Simulate user input 
    const {getByTestId} = render(<Login/>);
    const login = getByTestId("login-1")

    const emailInput = getByTestId("email");
    fireEvent.change(emailInput, {target: {value: "test@example.com"}})

    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "password123!" } });

    // Simulate form submission 
    const loginForm = getByTestId("login-form");
    fireEvent.submit(loginForm);

    // Wait for the login request to resolve
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert that the login request was made with the correct credentials
    expect(axios.post).toHaveBeenCalledWith("https://orbital-5731-moolah.onrender.com/api/auth", {
      email: "test@example.com",
      password: "password123!",
    });
  })

});
