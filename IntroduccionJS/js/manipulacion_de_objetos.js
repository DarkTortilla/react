//objetos manipulacion

const producto={
    nombre: "Tablet",
    precio:300,
    disponible:false
}


producto.disponible=true;

producto.img="imagen.jpg"

delete producto.precio;

Object.freeze(producto) //convierte el objeto en una constante no se pueden anadir ni eliminar propiedades tampoco cambiar las existentes

Object.seal(Producto) // se pueden modifica las propiedades existentes, pero no eliminar ni agregar nuevas