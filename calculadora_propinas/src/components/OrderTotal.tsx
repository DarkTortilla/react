import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps={
    order: OrderItem[]
    tip:number
}


export default function OrderTotal({order, tip}:OrderTotalsProps) {
    const subTotalAmount = useMemo(()=>order.reduce((total,item)=>total+(item.quantity*item.price),0),
     [order])

    const tipAmount =useMemo(()=>subTotalAmount*tip, [tip,order])
  
  
    return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina:</h2>
            <p>
                Sub total a pagar:{''}
                <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
            </p>
            <p>
                Propina:{''}
                <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>
            <p>
                Total a pagar:{''}
                <span className="font-bold">{formatCurrency(subTotalAmount+tipAmount)}</span>
            </p>
        </div>
        <button></button>
    
    </>
  )
}
