const firusArray=['Firus', 'Finux', 'Balto', 'Pirata'];


const numbers=[10,20,30];


const newArray=firusArray.filter(firus=>{
    firus!='Finux'
})

//includes
const includes= firusArray.includes('Finux');


//
const baltoArray= firusArray.filter(ejemplo); //filtra el array

const ejemplo=(element)=>{
    return element;
}

// devuelve si almenos un metodo cumple con la condicion

const resultado = numbers.some(number=>{
    number>15
})
//find devuelve el primer elemento que cumple una condicion
const resultado2= numbers.find(number=>
    numero>20
);


//Every retonrna true or false si todos los numemros cumplen con la condicion
const result3= numbers.every(number=>{
    number>5
})

//Retorna un acumulado de los numeros
const resultado4 = numbers.reduce((total, numero)=>
    total+numero,0
)