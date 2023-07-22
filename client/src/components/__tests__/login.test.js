import LoginPage from "../Login/LoginPage"
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthContextProvider } from "../../context/AuthContext"
import HomePage from "../HomePage/HomePage"

const MockLogin = () => { 
  return (
    <AuthContextProvider>
      <LoginPage/>
    </AuthContextProvider>
  )
}

// integration test
describe("Log in", () => { 
  it('Should allow user to log in to account', async () => { 
    render(<MockLogin/>);
    const emailElement = screen.getByPlaceholderText(/Email/i)
    const passwordElement = screen.getByPlaceholderText(/Password/i)
    const buttonElement = screen.getByRole("button", { name: /Sign In/i})
    
    fireEvent.change(emailElement, {target: {value: "test@example.com"}})
    fireEvent.change(passwordElement, {target: {value: "ABCabc123!"}})
    fireEvent.click(buttonElement)
    expect(<HomePage/>).toBeCalled()
  })
} )

