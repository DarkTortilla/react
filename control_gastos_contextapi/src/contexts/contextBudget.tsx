import { useReducer, createContext, useMemo } from "react"
import { budgetReducer, BudgetsActions, BudgetState, initialState } from "../reducers/budget-reducer"


type BudgetContextProps={
    state: BudgetState,
    dispatch:React.Dispatch<BudgetsActions>,
    totalExpenses:number,
    remainingBudget:number

}
type BudgetProviderProps={
    children:React.ReactNode
}

export const budgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider=({children}:BudgetProviderProps)=>{



    const [state,dispatch]=useReducer(budgetReducer, initialState);
    const totalExpenses = useMemo(()=>state.expenses.reduce((total, expense) => expense.amount+total,0), [state.expenses])
    const remainingBudget= state.budget - totalExpenses;
    return (
        <budgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget,
            }}
        >
            {children}
        </budgetContext.Provider>

    )
}