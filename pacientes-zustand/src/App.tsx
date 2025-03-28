import { ToastContainer } from 'react-toastify'
import './App.css'
import PatientForm from './components/PatientForm'
import PatientsList from './components/PatientsList'
import "react-toastify/ReactToastify.css"


function App() {

  return (
    <>
      <div className='container mx-auto mt-20'>
        <h1 className='font-black text-5xl md:w-2/3 md:mx-auto'>
          Seguimiento de pacientes {''}
          <span className='text-indigo-700'>Veterinaria</span>
        </h1>
      </div>

      <div className='mt-12 md:flex'>
        <PatientForm></PatientForm>
        <PatientsList></PatientsList>
      </div>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
