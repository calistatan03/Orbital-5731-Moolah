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

describe('Budget Planner Integration Test', () => {
  test('Adds and deletes a budget in Budget Planner', async () => {
    // Step 1: Render the App
    const { getByLabelText, getByPlaceholderText, getByRole, getByText, queryByText } = render(<MockApp />);
    
    // Step 2: Log in using the tester account
    // Assuming there's a login form that requires user input
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(loginButton);

    // Step 3: Tap on the 'Budget Planner' tab
    const budgetPlannerTab = getByRole('link', { name: 'Budget Planner' });
    fireEvent.click(budgetPlannerTab);

    // Step 4: Click on the 'Add Budget' button
    const addBudgetButton = getByRole('button', { name: 'Add Budget' });
    fireEvent.click(addBudgetButton);

    // Step 5: Enter budget information
    await enterBudgetInformation('Food', '200', '18/07/2023', 'Daily', getByLabelText, getByRole);

    // Step 6: Click on the 'View Budgets' button
    const viewBudgetsButton = getByRole('button', { name: 'View Budgets' });
    fireEvent.click(viewBudgetsButton);

    // Step 7: Find the newly-set budget and click on the Delete button
    await waitFor(() => {
      const newlySetBudget = getByText('Food');
      expect(newlySetBudget).toBeInTheDocument();

      const deleteButton = getByRole('button', { name: 'delete_btn' });
      fireEvent.click(deleteButton);
    });
  });
});

async function enterBudgetInformation(title, amount, date, recurrence, getByLabelText, getByRole) {
  const titleInput = getByLabelText('Title');
  const amountInput = getByLabelText('Amount');
  const dateInput = getByLabelText('Date');
  const recurrenceInput = getByLabelText('Recurrence');
  const submitButton = getByRole('button', { name: 'Submit' });

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(amountInput, { target: { value: amount } });
  fireEvent.change(dateInput, { target: { value: date } });
  fireEvent.change(recurrenceInput, { target: { value: recurrence } });

  fireEvent.click(submitButton);
}
