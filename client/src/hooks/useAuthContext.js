import { AuthContext } from "../context/AuthContext";
import { useContext } from "react"; // a hook

// if we want to useAuthContext value - the user value - on the state in any component, 
// we just invoke this hook and destructure the user from the context object 

export const useAuthContext = () => { 
  const context = useContext(AuthContext) 

  if (!context) { 
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context 
}