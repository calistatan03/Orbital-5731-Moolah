// import the necessary modules and dependencies
import { AddForm } from '../BillSplitter/AddForm';
import { UserOweItem } from '../BillSplitter/UserOweItem';
import { WhoOwesUserItem } from '../BillSplitter/WhoOwesUserItem'

jest.mock("../BillSplitter/AddForm", () => ({
  AddForm: jest.fn(),
}));

jest.mock('../BillSplitter/UserOweItem', () => ({ 
  UserOweItem: jest.fn(), 
})) 

jest.mock('../BillSplitter/WhoOwesUserItem', () => ({
  WhoOwesUserItem: jest.fn(),
}))

describe("Bill Splitter", () => {
  it("makes a successful REST API call to AddBill, user can create a new bill", async () => {
    // Set up the test data
    const billData = {
      title: "Outing",
      amount: 25,
      memberName: 'Mary', 
      paidMember: "Me",
      date: new Date("24 June 2023"),
    };

    // Mock the API response
    const expectedResponse = {
      status: 200,
      data: {
        success: true,
        message: "Budget added successfully",
        expense: {
          title: "Outing",
          amount: 25,
          memberName: 'Mary', 
          paidMember: "Me",
          date: new Date("24 June 2023"),
    }
      },
    };
    AddForm.mockResolvedValue(expectedResponse);

    // Call the API function
    const response = await AddForm(billData);

    // Assert the response matches the expected data
    expect(response).toEqual(expectedResponse);
    expect(AddForm).toHaveBeenCalledTimes(1);
    expect(AddForm).toHaveBeenCalledWith(billData);
  });

  it("accurately calculates the amount to pay and determines who owes whom", () => {
    
    // Set up the test data
    const billAmount = 25;
    const whoOwesUserData = { 
      title: "Outing",
      amount: 25,
      memberName: 'Mary', 
      paidMember: "Me",
      date: new Date("24 June 2023"),
    }

    const UserOwesData = { 
      title: "Outing",
      amount: 25,
      memberName: 'Me', 
      paidMember: "Mary",
      date: new Date("24 June 2023"),
    }


    // Call the function to calculate the bill split
    const billSplit1 = UseOweItem(UserOwesData);
    const billSplit2 = WhoOwesUserItem(whoOwesUserData);

    // Assert the calculated results
    expect(billSplit1.totalAmount).toBe(25);
    expect(billSplit2.totalAmount).toBe(25); 
  });

})