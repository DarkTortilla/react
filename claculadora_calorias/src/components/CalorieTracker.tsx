
import { useMemo } from 'react'
import { Activity } from '../types'


type CalorieTrackerProps={
    activities:Activity[]
}

// eslint-disable-next-line react-refresh/only-export-components
export default function ({activities}:CalorieTrackerProps) {

const caloriesConsumed= useMemo(()=> activities.reduce((total, activity)=>activity.category===1? total + activity.calories:total,0),[activities])
const caloriesBruned= useMemo(()=> activities.reduce((total, activity)=>activity.category===2? total + activity.calories:total,0),[activities])


    return (
    <>
        <h2 className='text-4xl font-black text-white text-center'>Resumen de Calorias</h2>
        <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5'>
        <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
            <span className='font-black text-6xl text-orange-400'>
                {caloriesConsumed}
            </span>
            
            Consumidas


            </p>   

            <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
            <span className='font-black text-6xl text-lime-400'>
                {caloriesBruned}
            </span>
            
            Quemadas
            </p>    
        </div>
   

        
    </>
  )
}
