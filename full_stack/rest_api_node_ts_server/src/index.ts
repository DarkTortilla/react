import server from "./server";

const PORT= process.env.PORT
server.listen(PORT||3000, ()=>{
    console.log(`Firus en el puerto 3000`)
})