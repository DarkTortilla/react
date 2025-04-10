import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import Notification from "../components/Notification"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function Layout() {
  const favoriteStorage = useAppStore(state => state.loadFromStotage)

  useEffect(() =>

    favoriteStorage()
    ,
    [])
  return (
    <>
      <Header></Header>
      <main className="container mx-auto py-16">
        <Outlet></Outlet>
      </main>
      <Modal></Modal>
      <Notification></Notification>

    </>

  )
}
