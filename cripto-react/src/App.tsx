
import { useEffect } from 'react'
import './App.css'
import CriptoSearchForm from './components/CriptoSearchForm'
import { useCryptoState } from './store/store'
import CryptoPriceDisplay from './components/CryptoPriceDisplay'

function App() {
  const fetchCryptos = useCryptoState((state)=>state.fetchCryptos)
  useEffect(()=>{
    fetchCryptos()
  }, [])

  return (
    <>
      <div className='container'>
        <h1 className='app-title'>
          Cotizador de <span>Criptomonedas</span> 
        </h1>
        <div className="content">
          <CriptoSearchForm >
          </CriptoSearchForm>
          
          <CryptoPriceDisplay/>
        </div>
      </div>
    </>
  )
}

export default App
