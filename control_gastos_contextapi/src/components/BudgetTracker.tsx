import AmountDisplay from './AmountDisplay'
import { useBudget } from '../hooks/useBudget'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export default function BudgetTracker() {

    const {state,totalExpenses,remainingBudget, dispatch}= useBudget()
    const percentage = +((totalExpenses/state.budget)*100).toFixed(2)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex justify-center'>
                <CircularProgressbar 
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage > 75?  '#fe2525':'#3b68f6',
                        trailColor:'#f5f5f5',
                        textSize:8
                    })}
                    text={`${percentage}% Gastado`}
                >

                </CircularProgressbar>
            </div>

            <div className='flex flex-col justify-center items-center gap-8'>
                <button 
                    type='button'
                    className='bg-pink-600 hover:bg-pink-700 w-full text-white uppercase font-bold
                    rounded-lg p-2'
                    onClick={()=>(dispatch({type:'reset-app'}))}
                >
                    Resetear App
                </button>
                <AmountDisplay 
                    label='Presupuesto'
                    amount={state.budget}
                ></AmountDisplay>
                <AmountDisplay 
                    label='Disponible'
                    amount={remainingBudget}
                ></AmountDisplay>
                <AmountDisplay 
                    label='Gastado'
                    amount={totalExpenses}
                ></AmountDisplay>

            </div>
        </div>)
}
