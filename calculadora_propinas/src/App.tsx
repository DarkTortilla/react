import { menuItems } from './data/db'
import './App.css'
import MenuItem from './components/MenuItem';
import useOrder from './hooks/userOrder';
import OrderContent from './components/OrderContent';
import OrderTotal from './components/OrderTotal';
import TipPercentageForm from './components/TipPercentageForm';

function App() {


  const { order,addItem,removeItem,tip, setTip }= useOrder()

  return (
    <>
    <header  className='bg-teal-400 py-5'>
      <h1 className='text-center text-4xl font-black'>Calculadora de Propinas y Consumo</h1>
    </header>
    <main className='max-w-7xl mx-auto py-20 grid md:grid-cols-2'>
      
      <div className='p-5'>
        <h2 className='text-4xl font-black'>Menu</h2>
      
      <div className='space-y-3 mt-10'>
        {menuItems.map(item=>(
          <MenuItem
          key={item.id}
          item={item}
          addItem={addItem}
          ></MenuItem>
        ))}
      </div>
        
      </div>

      <div className='border border-dashed border-slate-300 p-5 rounded-lg space-y-10'>
        <OrderContent 
        order={order}
        removeItem={removeItem}
        ></OrderContent>

        <TipPercentageForm
          setTip={setTip}
        >

        </TipPercentageForm>

        <OrderTotal 
        order={order}
        tip={tip}
        > 
        </OrderTotal>
      </div>
      

      



    </main>
    </>
  )
}

export default App
