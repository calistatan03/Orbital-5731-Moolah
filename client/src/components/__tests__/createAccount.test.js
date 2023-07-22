import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App'; 
import { AuthContextProvider } from '../../context/AuthContext';

const MockApp = () => { 
  return (<AuthContextProvider>
    <App/>
  </AuthContextProvider>)
}

describe('Sign Up Integration Test', () => {
  test('User can sign up', async () => {
    // Step 1: Render the App
    const { getByText, getByLabelText, getByRole } = render(<MockApp />);
    
    // Step 2: Click on 'Sign up here' link in the Login page
    const signUpLink = getByText('Sign up here');
    fireEvent.click(signUpLink);

    // Step 3: Enter user information
    await enterSignUpInformation('James', 'Tan', 'test@gmail.com', 'ABCabc123!', getByLabelText, getByRole);

    // Step 4: Click on the signup button
    const signUpButton = getByRole('button', { name: 'Sign Up' });
    fireEvent.click(signUpButton);

    // Add any assertions or checks for successful sign-up if your application provides a confirmation message or redirect after signing up.
    // For example, you can wait for a success message to appear:
    await waitFor(() => {
      const successMessage = getByText('You have successfully signed up!');
      expect(successMessage).toBeInTheDocument();
    });
  });
});

async function enterSignUpInformation(firstName, lastName, email, password, getByLabelText, getByRole) {
  const firstNameInput = getByLabelText('First Name');
  const lastNameInput = getByLabelText('Last Name');
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  
  fireEvent.change(firstNameInput, { target: { value: firstName } });
  fireEvent.change(lastNameInput, { target: { value: lastName } });
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
}
