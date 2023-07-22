import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import { AuthContextProvider } from '../../context/AuthContext';

const MockApp = () => { 
  return <AuthContextProvider>
    <App/>
  </AuthContextProvider>
}

describe('Budget Planner Integration Test', () => {
  test('Set and view budgets with different recurrence options', async () => {
    // Step 1: Render the MockApp
    const { getByPlaceholderText, getByLabelText, getByRole, getByText } = render(<MockApp />);
    
    // Step 2: Log in to the tester account
    // Assuming there's a login form that requires user input
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    fireEvent.click(loginButton);

    // Step 3: Tap on the 'Budget Planner' tab
    const budgetPlannerTab = getByRole('link', { name: 'Budget Planner' });
    fireEvent.click(budgetPlannerTab);

    // Step 4: Set budget with 'Daily' recurrence
    await setBudget('Food', '200', '18/07/2023', 'Daily', getByLabelText, getByRole);

    // Step 5: View the newly-set budget
    const viewBudgetsButton = getByRole('button', { name: 'View Budgets' });
    fireEvent.click(viewBudgetsButton);
    await waitFor(() => {
      const newlySetBudget = getByText('Food');
      expect(newlySetBudget).toBeInTheDocument();
    });

    // Step 6: Repeat Steps 1 to 5 for 'Weekly', 'Monthly', and 'Yearly' recurrence options
    const recurrenceOptions = ['Weekly', 'Monthly', 'Yearly'];
    for (const recurrence of recurrenceOptions) {
      await setBudget('Food', '200', '18/07/2023', recurrence, getByLabelText, getByRole);
      fireEvent.click(viewBudgetsButton);
      await waitFor(() => {
        const newlySetBudget = getByText('Food');
        expect(newlySetBudget).toBeInTheDocument();
      });
    }
  });
});

async function setBudget(title, amount, date, recurrence, getByLabelText, getByRole) {
  const addBudgetButton = getByRole('button', { name: 'Add Budget' });
  fireEvent.click(addBudgetButton);

  const titleInput = getByLabelText('Title');
  const amountInput = getByLabelText('Amount');
  const dateInput = getByLabelText('Date');
  const recurrenceSelect = getByLabelText('Recurrence');
  const submitButton = getByRole('button', { name: 'Submit' });

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(amountInput, { target: { value: amount } });
  fireEvent.change(dateInput, { target: { value: date } });
  fireEvent.change(recurrenceSelect, { target: { value: recurrence } });

  fireEvent.click(submitButton);
}
