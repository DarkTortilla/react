import { MenuItem } from '../types'


type MenuItemProps = {
    item: MenuItem,
    addItem: (item:MenuItem)=>void
}

export default function MenuItem({ item,addItem }: MenuItemProps) {
    return (
        <>

            <button className='border-2 rounded-md border-teal-400 w-full p-2 flex justify-between hover:bg-teal-200' 
                onClick={()=>addItem(item)}
            >
                <p>{item.name}</p>
                <p>{item.price}</p>
            </button>


        </>
    )
}
