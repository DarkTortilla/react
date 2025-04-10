import { lazy, Suspense } from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import IndexPage from "./pages/IndexPage"
import Layout from "./layouts/Layout"
import GenerateAI from "./pages/GenerateAI"

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<IndexPage />} index />


                    <Route path="/favoritos" 
                            element={<Suspense fallback='Cargando ...'>
                                <FavoritesPage>
                                </FavoritesPage>
                    </Suspense>} />
                    <Route path="/generate" element={<GenerateAI></GenerateAI>}/>


                </Route>
            </Routes>
        </BrowserRouter>
    )
}
