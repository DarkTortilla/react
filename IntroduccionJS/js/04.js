const Producto={
    nombre:"Firus",
    precio:300,
    disponible:false
}

console.log(Producto);
console.table(Producto);

console.log(Producto.nombre);


//destructing
const firus = Producto.nombre;
const {nombre}= Producto


const autenticado= true;
const usuarioFirus="Firus";

const nuevoFirus={
    autenticado,
    usuarioFirus
}

console.log(nuevoFirus);