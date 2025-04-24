import { useState } from "react";
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip, setTip] = useState(0)

    const addItem = (item: MenuItem) => {
        const itemExist = order.find(orderItem =>
            orderItem.id == item.id
        
        )  
        if (itemExist) {
            const updatedOder= order.map(orderItem=>
                orderItem.id===item.id ? {...orderItem, quantity:orderItem.quantity+1}: orderItem )
            setOrder(updatedOder)
            console.log('firus')
        }
        else {
            const newItem: OrderItem = { ...item, quantity: 1 }
            setOrder([...order, newItem])
        }



    }
    const removeItem = (id:number)=>{
        const updatedOder = order.filter(orderItem=> orderItem.id!==id)
        setOrder(updatedOder)
    }


    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem
    }


}