import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'


export type BudgetsActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } }


const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +JSON.parse(localStorageBudget) : 0
}
const initialExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
    editingId: Expense['id'],
    currentCategory:Category['id']
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory:''
}


const createExpense = (drafExpense: DraftExpense): Expense => {
    return {
        ...drafExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetsActions) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === 'hide-modal') {
        return {
            ...state,
            modal: false,
            editingId: '',
        }
    }
    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }

    }
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => action.payload.id !== expense.id)
        }
    }
    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    if (action.type === 'update-expense') {
        console.log(state.editingId);
        console.log(action.payload.expense)
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: '',
        }
    }
    if (action.type === 'reset-app') {

        return {
            ...state,
            budget: 0,
            expenses: [],
            editingId: ''
        };

    }
    if(action.type==='add-filter-category'){
        console.log(action.payload.id)
        return{
            ...state,
            currentCategory:action.payload.id
        }
    }



    return state;

}