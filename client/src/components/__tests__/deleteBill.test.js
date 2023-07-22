import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import { AuthContextProvider } from '../../context/AuthContext';

const MockApp = () => { 
  return ( 
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}

describe('Bill Splitter Integration Test', () => {
  test('User can add and settle a bill', async () => {
    // Step 1: Render the App
    const { getByText, getByLabelText, getByRole } = render(<MockApp />);
    
    // Step 2: Log in using tester email and password (if applicable)
    // You may need to create a separate helper function to perform the login process.
    // For example, if you have a login form component, you can use it to log in the user.
    await loginWithCredentials('test@example.com', 'Password123!', getByLabelText, getByRole);
    
    // Step 3: Navigate to the 'Bill Splitter' tab
    const billSplitterTab = getByText('Bill Splitter');
    fireEvent.click(billSplitterTab);

    // Step 4: Click on the 'Add Bill' button
    const addBillButton = getByText('Add Bill');
    fireEvent.click(addBillButton);

    // Step 5: Enter bill information
    await enterBillInformation('Ice-skating', 30, '18/07/2023', 2, 'Mary', 'Me', getByLabelText, getByRole);

    // Step 6: Click on the 'Cancel' button
    const cancelButton = getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    // Step 7: Check if the newly-added bill is visible on the main Bill Splitter display page
    const addedBill = getByText('Ice-skating');
    expect(addedBill).toBeInTheDocument();

    // Step 8: Click on the 'Settle' button
    const settleButton = getByRole('button', { name: 'Settle' });
    fireEvent.click(settleButton);

    // Step 9: Confirm the pop-up message by clicking 'Yes'
    const confirmYesButton = getByRole('button', { name: 'Yes' });
    fireEvent.click(confirmYesButton);

    // Add any assertions or checks for successful settling if your application provides a confirmation message or changes the bill status after settling.
    // For example, you can wait for a success message to appear:
    await waitFor(() => {
      const successMessage = getByText('Bill settled successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });
});

async function enterBillInformation(title, amount, date, numberOfMembers, otherMemberName, paidBy, getByLabelText, getByRole) {
  const titleInput = getByLabelText('Title');
  const amountInput = getByLabelText('Amount');
  const dateInput = getByLabelText('Date');
  const numberOfMembersInput = getByLabelText('Number of Members');
  const otherMembersInput = getByLabelText('Name of other members');
  const paidByInput = getByLabelText('Paid By');

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(amountInput, { target: { value: amount } });
  fireEvent.change(dateInput, { target: { value: date } });
  fireEvent.change(numberOfMembersInput, { target: { value: numberOfMembers } });
  fireEvent.change(otherMembersInput, { target: { value: otherMemberName } });
  fireEvent.change(paidByInput, { target: { value: paidBy } });
}

// You can define a separate helper function to handle the login process
async function loginWithCredentials(email, password, getByLabelText, getByRole) {
  // Implement your login process here, similar to entering information in the 'enterBillInformation' function
  // For example:
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  const loginButton = getByRole('button', { name: 'Login' });
  fireEvent.click(loginButton);
}
