import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

  const favorites = useAppStore(state => state.favorites)

  const hasFavorites = useMemo(()=> favorites.length>0, [favorites])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {favorites.map(recipe => (
            <DrinkCard key={recipe.idDrink} drink={recipe}></DrinkCard>
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">No hay resultados aun</p>
      )}

    </>

  )
}
