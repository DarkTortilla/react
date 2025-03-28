import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DraftPatient, Patient } from "./types";
import { v4 as uuidv4 } from "uuid";


type PatientState = {
    activeId: Patient['id']
    patients: Patient[]
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientByID: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (data: DraftPatient): Patient => {
    return { ...data, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(
    persist(    
      
    (set) => ({
    activeId: '',
    patients: [],
    addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({
            patients: [
                ...state.patients,
                newPatient
            ]
        }))

    },
    deletePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id)
        }))
    },
    getPatientByID: (id) => {
        console.log(id);
        set(() => ({
            activeId: id
        }))
    },
    updatePatient: (data)=>{
        
        set((state)=>({
            patients:state.patients.map(patient=>patient.id===state.activeId? {...data,id:state.activeId}: patient),
            activeId:'',
        }))
    }


})
,{
    name:'patient-storage'
})

))