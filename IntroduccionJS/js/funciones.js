function sumar(numero1=0, numero2=0){
    console.log(numero1+numero2);
}

//function expresion
const sumar= function(numero1=0, numero2=0){
    console.log(numero1+numero2);
}

//arrow funtion
const sumar =(numero1=0, numero2=0)=>console.log(numero1+numero2);

//funciones que retornan valores
const fnSumar= (numero1=0, numero2=0)=>{
    return numero1+numero2;
}

const result= sumar(5,5);

console.log(result);
