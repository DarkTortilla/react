const alumno= {
    nombre:'juan',
    examenes:{
        examen1:90
    }
}
console.log(alumno.examenes?.examen1);

const pagina =null ??1

///operador de corto circuito


if(pagina){
    console.log(pagina)
}

pagina && console.log(pagina)