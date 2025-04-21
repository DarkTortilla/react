import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema } from "../types";
import axios from "axios";

type ProductsData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductsData) {
  try {
    const result = safeParse(DraftProductSchema,{
        name: data.name,
        price:+data.price

    })
    console.log(result)
    if (result.success) {
        const url=`${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios.post(url, {
            name:result.output.name,
            price:result.output.price
        })

        console.log(data)


    } else {
        throw new Error('Datos no validos')
    }

    console.log(result)
  } catch (error) {
    console.log(error)
  }

  console.log("finux", data);
}

export async function getProducts() {
  try {
    const url =`${import.meta.env.VITE_API_URL}/api/products`
    const {data} = await axios(url)
    console.log(data)
    const result = safeParse(ProductsSchema,data.data)
    console.log(result)
    if (result.success) {
      return result.output
      
    }else{
      throw new Error('')
    }

  } catch (error) {

    console.log(error)
    
  }
  
}
