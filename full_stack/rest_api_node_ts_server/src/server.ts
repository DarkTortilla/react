import express from 'express';
import router from './routes/router';
import  swaggerUi, { serve }  from 'swagger-ui-express'
import swaggerSpec from './config/swagger';
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';


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

const corsOptions:CorsOptions={
    origin: function (origin, callback){
        console.log(origin)
        if(origin===process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Maldito pervertido'))
        }
    }
}



server.use(cors(corsOptions))



//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

//Routing
server.use('/api/products', router)

server.use('/api', (req, res)=>{
    res.status(200).json({msg:'firus'})
} )

//Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;
