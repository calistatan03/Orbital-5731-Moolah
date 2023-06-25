// import the necessary modules and dependencies
import axios from "axios";
import { AddForm } from "../ExpenseTracker/AddForm";

jest.mock("../ExpenseTracker/AddForm", () => ({
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
    };

    const responseData = {
      success: true,
      expense: {
        id: "123",
        title: "To the wet market",
        category: "Groceries",
        amount: 50,
      },
    };

    // Mock the axios.post method to return a successful response
    axios.post.mockResolvedValue({ data: responseData });

    // Call the addExpense function
    const response = await addExpense(expenseData);

    // Assert that the axios.post method was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith("https://orbital-5731-moolah.onrender.com/api/add-transaction", expenseData);

    // Assert that the response matches the expected data
    expect(response).toEqual(responseData);
  });
});
