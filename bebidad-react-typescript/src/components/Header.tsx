import React, {  useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const [searchFilters, setSearchfilters ]= useState({
        ingredient:'',
        category:''
    })

    const {pathname} = useLocation();
    const isHome = useMemo(()=> pathname === '/' , [pathname])

    
    const fetchCategories = useAppStore( (state)=> state.fetchCategories) 
    const categories = useAppStore((state)=> state.categories)
    const searchRecipes = useAppStore((state)=>state.searchRecipes)
    const showNotification = useAppStore((state)=>state.showNotification)

    useEffect(()=>{
        fetchCategories();
        
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setSearchfilters({
            ...searchFilters,
            [e.target.name]:e.target.value       
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //TODO: validacion 
        if (Object.values(searchFilters).includes('')) {
            showNotification({text:'se deben llenar todos los campos', error:true})
            return
        }
        //consultar recetas
        searchRecipes(searchFilters)

    }
    return (
        <header className='bg-slate-800'>
            <div className='mx-auto container px-5 py-16'>
                <div className='flex justify-between items-center'>
                    <div>
                        <img src="/logo.svg" alt="logo"  className='w-32'/>
                    </div>
                    <nav className="flex gap-4" >
                        <NavLink to='/' className={({isActive})=>isActive? "text-white uppercase font-bold":"text-orange-500 uppercase font-bold"}>Inicio</NavLink>
                        <NavLink to='/favoritos' className={({isActive})=>isActive? "text-white uppercase font-bold":"text-orange-500 uppercase font-bold"}>Favoritos</NavLink>
                        <NavLink to='/generate' className={({isActive})=>isActive? "text-white uppercase font-bold":"text-orange-500 uppercase font-bold"}>Generar receta</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingrediente</label>
                            <input id="ingredient" type="text" 
                                name="ingredient"
                                className=" p-3 w-full rounded-lg focus:outline-none bg-white"
                                placeholder="Nombre en Ingles"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        <div>
                            <label htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoria</label>
                            <select id="category" 
                                name="category"
                                className=" p-3 w-full rounded-lg focus:outline-none bg-white"
                                onChange={handleChange}
                                value={searchFilters.category}
                                
                            >
                                <option value="">--Seleccione--</option>
                                {
                                    categories && categories.drinks.map(category=>(
                                        <option value={category.strCategory} key={category.strCategory}>{category.strCategory}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <input type="submit" value="Buscar recetas"  className="
                            cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full rounded-lg uppercase py-2
                        "/>
                    </form>
                )}
            </div>
        </header>
    )
}
