import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../utils/recipies-schema";
import { Drink, SearchFilter } from "../types";

 
 export async function getCaegories(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url);
    console.log(data)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    console.log(result)
    if(result.success){
        return result.data
    }
    else{
        console.log(result.error)
    }
 }

 export async function getRecipes(searchFilter: SearchFilter){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilter.category}&i=${searchFilter.ingredient}`
    const {data} =await axios(url);
    const result = DrinksAPIResponseSchema.safeParse(data);
    if(result.success){
        return result.data
    }
 }

 export async function getRecipie(id:Drink['idDrink']){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } =await axios(url);
    const result =  RecipeAPIResponseSchema.safeParse(data.drinks[0]);

    if(result.success){
        return result.data;
    }
    
 }