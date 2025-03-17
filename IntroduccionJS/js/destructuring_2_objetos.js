const producto={
    nombre: "Firus",
    precio: 3000,
    disponible: false
}
const cliente={
    nombre:"Juan",
    premiun:true,
    direccion:{
        calle:"Calle Firus "
    }
}
const {nombre }= producto;
const { nombre: nombreCliente, direccion:{calle}}= cliente;
