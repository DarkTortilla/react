import express from 'express';
import router from './routes/router';
import  swaggerUi  from 'swagger-ui-express'
import swaggerSpec from './config/swagger';
import db from './config/db'
import colors from 'colors'


export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue("conexion Finuxlesca"))
    } catch (error) {
        console.log(error)
        console.log(colors.red("Firus error en la base de datos"))
    }
    
}
connectDB()

//Instancia de express
const server = express();
//Leer datos de formularios
server.use(express.json())

//Routing
server.use('/api/products', router)

server.use('/api', (req, res)=>{
    res.status(200).json({msg:'firus'})
} )

//Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;
