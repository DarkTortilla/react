import {exit} from 'node:process'

import db from '../config/db'
import { existsSync } from 'node:fs'

const clearDB = async () =>{
    try {
        await db.sync({force:true})
        console.log('Datos eliminados')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(0)
    }
}

if(process.argv[2]=== '--clear' || process.argv[2]==='-C'){
    clearDB()
}
console.log(process.argv)