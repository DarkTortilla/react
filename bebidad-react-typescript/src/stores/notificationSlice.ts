import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, 'text' | 'error'>) =>void,
  hideNotification: () => void

}

export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  } as Notification,
  showNotification:(payload)=> {
      set({
        notification:{
            error:payload.error,
            text:payload.text,
            show:true
        }
      })
      setTimeout(()=>{
        get().hideNotification()
      }, 5000)
  },
  hideNotification: ()=>{
    set({
        notification: {
            text: "",
            error: false,
            show: false,
          }
    })
  }
});
