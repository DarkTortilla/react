import { Response, Request } from "express";
import Product from "../models/Product.model";
import { populate } from "dotenv";


export const getProducts = async (req:Request, res:Response)=>{
    try {
        const products =await Product.findAll()
        res.status(200).json({data:products})
    } catch (error) {
        console.log(error)
    }
    
}

export const getProductById= async (req:Request, res:Response)=>{
    try {
        const {id}= req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({error:'producto no encontrado'})
        }
        res.status(200).json({data:product})
    } catch (error) {
        
    }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error)
  }
};

export const updateProduct = async (req:Request, res:Response)=>{
    try {
        const {id}= req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({error:'producto no encontrado'})
        }
        await product.update(req.body);
        await product.save()

        res.status(200).json({data:product})
    } catch (error) {
        console.log(error)
    }
}


export const updateAvailability =async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({error:'producto no encontrado'})
        }


        product.availability = !product.dataValues.availability;
        await product.save()
        res.json({data:product})
    } catch (error) {
        
    }
}

export const deleteProduct = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({error:'producto no encontrado'})
        }
        await product.destroy();
        res.status(200).json({data:'firus murio'})
        
    } catch (error) {
        
    }
}