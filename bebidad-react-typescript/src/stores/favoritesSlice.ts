import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites:Recipe[],
    handleClickFavorite: (recipie:Recipe)=>void,
    favoriteExists: (id:Recipe['idDrink'])=>boolean,
    loadFromStotage: () => void
}
export const createFavoritesSlice:StateCreator<FavoritesSliceType & NotificationSliceType , [] ,[] , FavoritesSliceType>=(set, get, api) =>({
    favorites:[],
    handleClickFavorite:(recipie)=> {
        if(get().favoriteExists(recipie.idDrink)){
            set({
                favorites:get().favorites.filter(favorite=>favorite.idDrink !== recipie.idDrink)
            })
            createNotificationSlice( set, get ,api).showNotification({text:'Se elimino de favoritos',error:false})
        }
        else{
            set({
                favorites:[...get().favorites, recipie]
            })
            createNotificationSlice( set, get ,api).showNotification({text:'Se agrego',error:false})

        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
        
    },
    favoriteExists:(id)=>{
        return get().favorites.some(favorite=>favorite.idDrink === id)
    },
    loadFromStotage:()=>{
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})