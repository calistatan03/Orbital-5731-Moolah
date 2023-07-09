import { createContext, useReducer, useEffect, useState }  from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios'; 
import { useQuery } from '@tanstack/react-query';

// useReducer is similar to useState => returns us a 'state' and 'dispatch' 
// dispatch is function that we can use to update the state value 
// first argument -> a reducer function that we use to update the state (tgt w dispatch function)
// second argument -> specify an initial value for the state 

export const BudgetsContext = createContext({});


// state represents previous state 
// action represents object passed through the dispatch function
/*
export const budgetsReducer = (state, action) => { 

  // check action type - what do we want to do with the data? 
  switch (action.type) { 
    case 'CREATE_BUDGET': 
      return { 
        budgets: [action.payload, ...state.budgets]
      }
    case 'SET_BUDGETS': 
      return { 
        budgets: action.payload
      }
    default: 
      return state
  } 

}

export const BudgetsContextProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(budgetsReducer, { 
    budgets: null
  });

  // to update state object - call the dispatch function first
  // type property describes in words, the state change that we want to make
  // payload property represents any data we need to make this state change
  // whatever we pass through the dispatch function is called an ACTION

  // when we call the dispatch function, in turn, our reducer function (budgetsReducer) is invoked
  // action is passed through the reducer function so that it can do it's thing and update the state accordingly


  return (
    <BudgetsContext.Provider value={{...state, dispatch}}> 
      { children }
    </BudgetsContext.Provider>
  )
}
*/