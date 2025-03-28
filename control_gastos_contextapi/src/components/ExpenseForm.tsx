import React, { useEffect, useState } from 'react'
import { categories } from '../data/categories'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css'
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';





export default function ExpenseForm() {

    const [expense,setExpense]=useState<DraftExpense>({
        expenseName:'',
        amount:0,
        category:'',
        date:new Date()
    })


    const {dispatch, state,remainingBudget} =useBudget()
    const [previousAmount, setPreviousAmount]= useState(0)
    
    useEffect(()=>{
        if(state.editingId){
            const editingExpense= state.expenses.filter(expense=>expense.id===state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])


    const [error, setError]= useState('')


    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        const {name,value}=e.target;   

        const isAmountField=['amount'].includes(name)

        setExpense({
            ...expense,
            [name]:isAmountField ?+value:value
        })
    }


    const handleChangeDate=(date:Value)=>{
        setExpense({
            ...expense,
            date
        })
    }
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
    
        if(Object.values(expense).includes('')){
            console.log("Firus")
            setError('Todos los campos son obligatorios')
            return
        }
        if ((expense.amount-previousAmount)>remainingBudget) {
            setError('Maldito miserable')
            return
        }

        if(state.editingId){

            // console.log('firus')
            dispatch({type:'update-expense',payload: {expense:{id:state.editingId, ...expense}} })
        }
        else{
          dispatch({type: 'add-expense', payload: {expense}})  
        }
        

    
    }



    return (
        <form onSubmit={handleSubmit} className='space-y-5'>
            <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>{state.editingId? 'Editar gasto':'Agregar Gasto'}</legend>


            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className='flex flex-col gap-2'>
                <label htmlFor="expenseName" className='text-xl'>Nombre del gasto:</label>
                <input type="text" name='expenseName' id='expenseName' className='bg-slate-100 p-2' 
                value={expense.expenseName}
                onChange={handleChange}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-xl'>Cantidad del gasto:</label>
                <input type="number" name='amount' id='amount' className='bg-slate-100 p-2' 
                value={expense.amount}
                onChange={handleChange}
                />
            </div>


            <div className='flex flex-col gap-2'>
                <label htmlFor="category" className='text-xl'>Tipo de gasto:</label>
                <select id='category' className='bg-slate-100 p-2' 
                value={expense.category}
                onChange={handleChange}
                name='category'
                >
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-xl'>Fecha del gasto:</label>
                <DatePicker value={expense.date}
                    className="bg-slate-100 p-2 border-0"
                    onChange={handleChangeDate}
                ></DatePicker>
            </div>

            <input type="submit"
                className='bg-blue-600 cursor-pointer w-full p-2
            text-white uppercase font-bold rounded-lg'
                value={state.editingId? 'Editar gasto':'Agregar Gasto'}
            />
        </form>
    )
}
