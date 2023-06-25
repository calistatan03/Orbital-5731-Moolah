// import the necessary modules and dependencies
import axios from "axios";
import { AddForm } from "../ExpenseTracker/AddTransaction/AddForm";

jest.mock("../ExpenseTracker/AddTransaction/AddForm", () => ({
  AddForm: jest.fn(),
}));

// Begin the test
describe("AddExpense API", () => {
  it("makes a successful API call to AddExpense and create a new expense", async () => {
    // Set up the test data
    const expenseData = {
      title: "To the wet market",
      category: "Groceries",
      amount: 50,
      date: new Date("24 June 2023"),
    };

    const expectedResponse = {
      success: true,
      expense: {
        id: "123",
        title: "To the wet market",
        category: "Groceries",
        amount: 50,
        date: new Date("24 June 2023"),
      },
    };

    // Mock the axios.post method to return a successful response
    AddForm.mockResolvedValue(expectedResponse);

    // Call the addExpense function
    const response = await AddForm(expenseData);

    expect(response).toEqual(expectedResponse);
    expect(AddForm).toHaveBeenCalledTimes(1);
    expect(AddForm).toHaveBeenCalledWith(expenseData);
  });
});
