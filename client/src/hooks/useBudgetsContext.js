import { BudgetsContext } from '../context/BudgetsContext';
import { useContext } from 'react';

// make the hook function 
export const useBudgetsContext = () => { 

  // this hook (context) returns to us the value of this BudgetsContext (aka the value of the state & dispatch)
  const context = useContext(BudgetsContext)

  // checking just in case there is no value for the context 
  if (!context) { 
    throw Error('useBudgetsContext must be used inside a BudgetsContextProvider')
  }

  return context
}
