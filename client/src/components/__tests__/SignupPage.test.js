import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import signupController from '../../../../server/controllers/Signup/signup';
import SignupPage from '../Signup/SignupPage';

const MockSignup = () => { 
  return (
    <BrowserRouter>
      <SignupPage/>
    </BrowserRouter>
  )
}

// Begin the test
describe("SignUp component", () => {
  it("allows a user to create a new account with valid password", async () => {

    // Mock the axios.post method to simulate a successful account creation request
    jest.spyOn(axios, "post").mockResolvedValueOnce({ data: { success: true } });

    // Render the SignUp component
    const {getByTestId } = render(<SignupPage />);

    // Simulate user input
    const emailInput = getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const firstNameInput = getByTestId("first-name");
    fireEvent.change(firstNameInput, { target: { value: "Tom" } })

    const lastNameInput = getByTestId("last-name");
    fireEvent.change(lastNameInput, { target: { value: "Smith" } })

    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    // Simulate form submission
    const signUpForm = getByTestId("signup-form");
    fireEvent.submit(signUpForm);

    // Wait for the account creation request to resolve
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert that the account creation request was made with the correct data
    expect(axios.post).toHaveBeenCalledWith("/api/user", {
      email: "test@example.com",
      password: "Password123!",
      firstName: "Tom",
      lastName: "Smith"
    });

    // Assert that the user account was successfully created
    // Check for a redirect to the login page
    // For example:
    expect(location.pathname).toEqual("/");
  });

  it("checks for invalid password input", () => {
    // Set up the test data
    const req = {
      body: {
        email: "test@example.com",
        firstName: "Tom", 
        lastName: "Smith",
        password: "passwor" // Invalid password (less than 8 characters)
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    signupController(req, res);

    // Assert that the controller responds with the appropriate error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Password should be at least 8 characters long",
    });
  });
});