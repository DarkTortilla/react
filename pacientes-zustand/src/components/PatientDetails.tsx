import { usePatientStore } from '../store'
import { Patient } from '../types'
import PatientDetailItem from './PatientDetailItem'

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
    const deletePatient=usePatientStore((state=>state.deletePatient));
    const getPatientByID=usePatientStore(state=>state.getPatientByID);

    return (
        <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
            <PatientDetailItem label='ID' data={patient.id}></PatientDetailItem>
            <PatientDetailItem label='Nombre' data={patient.name}></PatientDetailItem>
            <PatientDetailItem label='Propietario' data={patient.caretaker}></PatientDetailItem>
            <PatientDetailItem label='Email' data={patient.email}></PatientDetailItem>
            <PatientDetailItem label='Fecha Alta' data={patient.date.toString()}></PatientDetailItem>
            <div className='flex sm:flex-col justify-between gap-3 mt-10 '>
                <button 
                    className='py-2 px-10 bg-indigo-600 text-white hover:bg-indigo-700 font-bold uppercase rounded-lg'
                    onClick={
                        ()=>getPatientByID(patient.id)
                    }
                    >Editar
                </button>
                <button 
                    className='py-2 px-10 bg-red-600 text-white hover:bg-red-700 font-bold uppercase rounded-lg'
                    onClick={
                        ()=>deletePatient(patient.id)
                    }
                    >Eliminar
                </button>
            </div>
        </div>
    )
}
