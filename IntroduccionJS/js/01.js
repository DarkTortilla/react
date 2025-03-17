const cliente = {
	nombre:"Pepe",
	suscrito: true

}
const producto = {
	nombre: "xbox",
	precio: 300
}

const carrito= {
    cantidad: 1,
    ...producto //spread operator
}

console.log(carrito); // {cantidad: 1, nombre: "xbox", precio: 300}

//const productoCliente = {...producto, ...cliente}
console.log(productoCliente); // {nombre: "Pepe", suscrito: true, precio: 300} 


const productoCliente = {
    nombreCliente: cliente.nombre,
    suscrito: cliente.suscrito,
    nombreProducto: producto.nombre,
    precio: producto.precio
};