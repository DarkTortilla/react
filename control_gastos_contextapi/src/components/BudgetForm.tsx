import { useMemo, useState } from 'react'
import { useBudget } from '../hooks/useBudget';


export default function BudgetForm() {

    const [budget, setBudget]= useState(0);
    const {dispatch}=useBudget();


    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setBudget(parseInt(e.target.value));
    }

    const isValid= useMemo(()=>{
        return isNaN(budget) || budget<=0;
    },[budget]);

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch({type:"add-budget",payload:{budget}});
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5" >
                <label htmlFor="budget" className="text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    type="number"
                    id="budgetID"
                    className="w-full bg-white border bordegr200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />



            </div>
            <input type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 curso
                r-pointer w-full text-white font-black p-2
                diabled:opacity-40
                disabled:cursor-not-allowed
                "
                disabled={isValid}
            />

        </form>
    )
}
