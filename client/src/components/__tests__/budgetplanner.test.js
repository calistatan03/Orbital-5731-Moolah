// import the necessary modules and dependencies
import { BudgetForm } from "../BudgetPlanner/BudgetForm"; // assuming addExpense is a function that makes the API call
import { Display } from '../BudgetPlanner/Dashboard';

// Mock the API module
jest.mock("../BudgetPlanner/BudgetForm", () => ({
  BudgetForm: jest.fn(),
}));

jest.mock("../BudgetPlanner/Dashboard", () => ({
  Display: jest.fn(),
}))

// Begin the test
describe("Budget Planner", () => {
  it("makes a successful REST API call to AddBudget", async () => {
    // Set up the test data
    const budgetData = {
      category: "Groceries",
      amount: 50,
    };

    // Mock the API response
    const expectedResponse = {
      status: 200,
      data: {
        success: true,
        message: "Budget added successfully",
        expense: {
          id: "abc123",
          category: "Groceries",
          amount: 50,
        },
      },
    };
    BudgetForm.mockResolvedValue(expectedResponse);

    // Call the API function
    const response = await BudgetForm(budgetData);

    // Assert the response matches the expected data
    expect(response).toEqual(expectedResponse);
    expect(BudgetForm).toHaveBeenCalledTimes(1);
    expect(BudgetForm).toHaveBeenCalledWith(expenseData);
  });

  it("Makes a successful API call to the AddExpense API", async() => { 
    // Set up the test data 
    const expenseData = {category: "Groceries", amount: 50, date: new Date("24 June 2023"), title: "Vegetables"};


    // Mock API response
    const expectedResponse = {
      status: 200,
      data: {
        success: true,
        message: "Expense retrieved successfully",
        expense: [
      {category: "Groceries", amount: 50, date: new Date("24 June 2023"), title: "Vegetables"},
    ],
      },
    };

    Display.mockResolvedValue(expenseData); 

    // Call the API function 
    const response = await Display(expenseData); 

    // Assert the response matches the expected data 
    expect(response).toEqual(expectedResponse); 
    expect(Display).toHaveBeenCalledTimes(1); 
    expect(Display).toHaveBeenCalledWith(expenseData);

  })
});
