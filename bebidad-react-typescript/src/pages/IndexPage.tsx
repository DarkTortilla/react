import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks])

  return (
    <>
      
      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {drinks.drinks.map(drink => (
            <DrinkCard key={drink.idDrink} drink={drink}></DrinkCard>
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">No hay resultados aun</p>
      )}
    </>
  )
}
