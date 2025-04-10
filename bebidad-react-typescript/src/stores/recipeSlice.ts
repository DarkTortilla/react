import { StateCreator } from "zustand"
import { getCaegories, getRecipes, getRecipie } from "../services/RecipieService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"



export type RecipieSliceType ={
categories: Categories,
drinks:Drinks
recipe:Recipe
modal:boolean
fetchCategories: () => Promise<void>
searchRecipes: (searchFilter:SearchFilter) =>Promise<void>
selectRecipe: (id:Drink['idDrink']) => Promise<void>
closeModal: () =>void
}

export const createRecipesSlice:StateCreator<RecipieSliceType> = (set)=>({
    categories:{
        drinks:[]
    },
    drinks:{
        drinks:[]
    },
    recipe:{
    } as Recipe,
    modal:false,

    fetchCategories: async ()=>{
        const categories = await getCaegories();
        console.log(categories)
        set({
            categories, 
        })
    },

    searchRecipes: async (searchFilter)=>{
        console.log('buscando recetas')
        const drinks = await getRecipes(searchFilter);
        set({
            drinks
        })
    },
    selectRecipe: async (id)=>{
        const recipe = await getRecipie(id);

        set({
            recipe,
            modal:true
        })
    },
    closeModal: () =>{
        set({
            modal:false,
            recipe:{} as Recipe
        })
    }
})