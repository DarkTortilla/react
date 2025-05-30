/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react"
import './App.css'
import Guitarra from './components/Guitarra'
import Header from './components/Header'
import { db } from './data/data'

function App() {
  
  
  const initialCart=()=>{
    const localStorageCart= localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }
  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS=5;
  const MIN_ITEMS=1;




  useEffect(()=>{   
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  


  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists === -1) {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    }
    console.log(cart);
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity<MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }

      }
      return item
    })

    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity>MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }

      }
      return item
    })

    setCart(updatedCart)
  }

  function resetCart(){
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        resetCart={resetCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitarra
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
              
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
