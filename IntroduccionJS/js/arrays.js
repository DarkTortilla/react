const tecnologias=[20,30,40] 
tecnologias.push("Firus") // muta el arreglo, agrega un elemento en el siguiente indice
const nuevoArreglo= [...tecnologias, "Firus"] /// lomismo que  lo anterior pero no lo muta
console.log(tecnologias);
tecnologias.shift()//elimina el elemento de un arreglo
const tecnologias2 = tecnologias.filter(tec=>{
    if(tec!="firus"){
        return tec;
    }
})
const firus=tecnologias.map(firus=>{ //permite mutar el arreglo
    return firus;
})
console.log(firus);



const personas= ["Juan","Martin ","Tania", "Mireya","Ezperanza", "Sergio", "Eduardo"];
const [primero, segundo, tercero]=personas;
console.log(primero, segundo, tercero); //Juan Martin Tania
const [primero1, segundo2, tercero2, ...resto]=personas;   //Juan Martin Tania [ 'Mireya', 'Ezperanza', 'Sergio', 'Eduardo' ]

//for
for(let i=0; i<personas.length; i++){ 
    console.log(personas[i]); 
}

//forEach

personas.forEach(persona=>{
    console.log(persona);
})  


for (const prersona of personas){
    console.log(persona);
    
}

// map  
const nuevoArrayMap= personas.map(persona=>{
    if(persona=="Juan"){
        return "Juanito";
    }
    else{
        return persona;
    }
})  

//filter    
const nuevoArray= personas.filter(persona=>{
    return persona!="Juan";
})      //["Martin ","Tania", "Mireya","Ezperanza", "Sergio", "Eduardo"]

//find  
const resultado= personas.find(persona=>{
    return persona=="Juan";
})      //Juan

const numeros= [10,20,30,40,50];

//reduce
const total= numeros((total, numero)=>{
    return total+numero;
})     //150

//includes
const IncluyeAJuan= personas.includes("Juan"); //true  

//some  
const AlgunoEsMayor= numeros.some(numero=>{
    return numero>60;
})      //false


//every
const TodosSonMayores= numeros.every(numero=>{
    return numero>5;
})      //true  

//sort
const ordenados= numeros.sort((a,b)=>{
    return b-a;
})      //[50,40,30,20,10]

//reverse
const invertido= personas.reverse();  //["Eduardo", "Sergio", "Ezperanza", "Mireya", "Tania", "Martin ", "Juan"]




