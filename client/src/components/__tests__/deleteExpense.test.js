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

describe('Expense Tracker Integration Test', () => {
  test('Log and delete an expense in Expense Tracker', async () => {
    // Step 1: Render the App
    const { getByLabelText, getByPlaceholderText, getByRole, getByText, queryByText } = render(<MockApp />);
    
    // Step 2: Log in using the tester account
    // Assuming there's a login form that requires user input
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    fireEvent.click(loginButton);

    // Step 3: Tap on the 'Expense Tracker' tab
    const expenseTrackerTab = getByRole('link', { name: 'Expense Tracker' });
    fireEvent.click(expenseTrackerTab);

    // Step 4: Click on the 'Add Transaction' button
    const addTransactionButton = getByRole('button', { name: 'Add Transaction' });
    fireEvent.click(addTransactionButton);

    // Step 5: Enter expense information
    await enterExpenseInformation('Lunch', '30', '18/07/2023', 'Food', getByLabelText, getByRole);

    // Step 6: Click on the 'Back' button
    const backButton = getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);

    // Step 7: Click on the 'View Statistics' button
    const viewStatisticsButton = getByRole('button', { name: 'View Statistics' });
    fireEvent.click(viewStatisticsButton);

    // Step 8: Find the newly-added expense and click on the delete button
    await waitFor(() => {
      const transactionHistory = getByText('Transaction History');
      expect(transactionHistory).toBeInTheDocument();
      
      const newlyAddedExpense = getByText('Lunch');
      expect(newlyAddedExpense).toBeInTheDocument();

      const deleteButton = getByRole('button', { name: 'delete_btn' });
      fireEvent.click(deleteButton);
    });
  });
});

async function enterExpenseInformation(title, amount, date, category, getByLabelText, getByRole) {
  const titleInput = getByLabelText('Title');
  const amountInput = getByLabelText('Amount');
  const dateInput = getByLabelText('Date');
  const categoryInput = getByLabelText('Category');
  const submitButton = getByRole('button', { name: 'Submit' });

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(amountInput, { target: { value: amount } });
  fireEvent.change(dateInput, { target: { value: date } });
  fireEvent.change(categoryInput, { target: { value: category } });

  fireEvent.click(submitButton);
}
