import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import { AuthContextProvider } from '../../context/AuthContext';

const MockApp = () => { 
  return <AuthContextProvider>
    <App/>
  </AuthContextProvider>
}

describe('Expense Tracker Integration Test', () => {
  test('Log a new expense and view it in the transaction history', async () => {
    // Step 1: Render the App
    render(<MockApp />);
    
    // Step 2: Log in to the tester account
    // Assuming there's a login form that requires user input
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(loginButton);

    // Step 3: Tap on the 'Expense Tracker' tab
    const expenseTrackerTab = screen.getByRole('link', { name: 'Expense Tracker' });
    fireEvent.click(expenseTrackerTab);

    // Step 4: Click on the 'Add Transaction' button
    const addTransactionButton = screen.getByRole('button', { name: 'Add Transaction' });
    fireEvent.click(addTransactionButton);

    // Step 5: Enter details in the form
    const titleInput = screen.getByLabelText('Title');
    const amountInput = screen.getByLabelText('Amount');
    const dateInput = screen.getByLabelText('Date');
    const categoryInput = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(titleInput, { target: { value: 'Lunch' } });
    fireEvent.change(amountInput, { target: { value: '30' } });
    fireEvent.change(dateInput, { target: { value: '18/07/2023' } });
    fireEvent.change(categoryInput, { target: { value: 'Food' } });

    fireEvent.click(submitButton);

    // Step 6: Click on the 'Back' button to view the newly-logged expense in the calendar display
    const backButton = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);

    // Step 7: Click on the 'View Statistics' button to view the newly-logged expense under 'Transaction History'
    const viewStatisticsButton = screen.getByRole('button', { name: 'View Statistics' });
    fireEvent.click(viewStatisticsButton);

    // Step 8: Assert that the newly-logged expense is visible in the transaction history
    await waitFor(() => {
      const newlyLoggedExpense = screen.getByText('Lunch');
      expect(newlyLoggedExpense).toBeInTheDocument();
    });
  });
});
