import { useContext } from "react"
import { budgetContext } from "../contexts/contextBudget"

export const useBudget = () => {
    const context = useContext(budgetContext) ;

    if(!context){
        throw new Error("useBudget must be used within a BudgetProvider")
    }
    return context;
}