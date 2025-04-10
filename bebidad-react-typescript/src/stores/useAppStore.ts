import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipieSliceType } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";
import { createAISlice, AISlice } from "./aiSlice";

export const useAppStore = create<RecipieSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))