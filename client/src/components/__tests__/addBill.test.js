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
  test('Records and views a new bill in Bill Splitter', async () => {
    // Step 1: Render the App
    const { getByLabelText, getByPlaceholderText, getByRole, getByText, queryByText } = render(<MockApp />);
    
    // Step 2: Log in using the tester email and password
    // Assuming there's a login form that requires user input
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    fireEvent.click(loginButton);

    // Step 3: Tap on the 'Bill Splitter' tab
    const billSplitterTab = getByRole('tab', { name: 'Bill Splitter' });
    fireEvent.click(billSplitterTab);

    // Step 4: Click on the 'Add Bill' button
    const addBillButton = getByRole('button', { name: 'Add Bill' });
    fireEvent.click(addBillButton);

    // Step 5: Enter bill information
    await enterBillInformation(
      'Ice-skating',
      '30',
      '18/07/2023',
      '2',
      'Mary',
      'Me',
      getByLabelText,
      getByRole
    );

    // Step 6: Click on 'Cancel' button
    const cancelButton = getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    // Step 7: View the newly recorded bill under 'Who Owes You'
    await waitFor(() => {
      const billHeader = getByText('Who Owes You');
      expect(billHeader).toBeInTheDocument();
      
      const billTitle = getByText('Ice-skating');
      expect(billTitle).toBeInTheDocument();

      const billAmount = getByText('$30.00');
      expect(billAmount).toBeInTheDocument();

      const billDate = getByText('18/07/2023');
      expect(billDate).toBeInTheDocument();

      const billMembers = getByText('2');
      expect(billMembers).toBeInTheDocument();

      const billOwesYou = getByText('Mary owes you $15.00');
      expect(billOwesYou).toBeInTheDocument();
    });
  });
});

async function enterBillInformation(
  title,
  amount,
  date,
  numMembers,
  nameOfOtherMember,
  paidBy,
  getByLabelText,
  getByRole
) {
  const titleInput = getByLabelText('Title');
  const amountInput = getByLabelText('Amount');
  const dateInput = getByLabelText('Date');
  const numMembersInput = getByLabelText('Number of Members In the Group');
  const nameOfOtherMemberInput = getByLabelText('Name of other members');
  const paidBySelect = getByLabelText('Paid By');
  const submitButton = getByRole('button', { name: 'Submit' });

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(amountInput, { target: { value: amount } });
  fireEvent.change(dateInput, { target: { value: date } });
  fireEvent.change(numMembersInput, { target: { value: numMembers } });
  fireEvent.change(nameOfOtherMemberInput, { target: { value: nameOfOtherMember } });
  fireEvent.change(paidBySelect, { target: { value: paidBy } });

  fireEvent.click(submitButton);
}
