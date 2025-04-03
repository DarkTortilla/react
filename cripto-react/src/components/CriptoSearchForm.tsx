import React, { useState } from "react";
import { currencies } from "../data";
import { useCryptoState } from "../store/store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";



export default function CriptoSearchForm() {

    const cryptoCurrencies = useCryptoState((satate)=>satate.cryptoCurrencies)
    const fetchData = useCryptoState((satate)=>satate.fetchData)
    const [pair, setPair]= useState<Pair>({
        currency:'',
        cryptoCurrency:''
    });
    const [error, setError]= useState('');

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setPair({
            ...pair,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.values(pair).includes('')){
            setError('Los campos no pueden estar vacios');
            return;
        }
        setError('')
        fetchData(pair)
    };

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="form">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="field">
            <label htmlFor="cryptoCurrency">Crypto Moneda: </label>
            <select name="cryptoCurrency" id="cryptoCurrency" onChange={handleChange} value={pair.cryptoCurrency}>
                <option value="">--Selecione una moneda--</option>
                {cryptoCurrencies.map(cryptoCurrency=>(
                    <option key={cryptoCurrency.CoinInfo.Name} value={cryptoCurrency.CoinInfo.Name}>{cryptoCurrency.CoinInfo.FullName}</option>)
                )
                 }
            </select>
        </div>
        <div className="field">
            <label htmlFor="currency">Moneda: </label>
            <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                <option value="">--Selecione una moneda--</option>
                {currencies.map(currency=>(
                    <option value={currency.code} key={currency.code}>{currency.name}</option>
                ))}
            </select>
        </div>
        <input type="submit" name="" id="" value="Cotizar"/>
    </form>

  )
}
