/*Constructores*/
/*Quintupla*/
function Quintupla(est_Entrada,arr_alfabeto,est_Iniciales,est_Finales,arrestados){
    this.est_Entrada = est_Entrada
    this.arr_alfabeto = arr_alfabeto
    this.est_Iniciales = est_Iniciales
    this.est_Finales = est_Finales
    this.arr_estados = arr_estados
}
/*Estados con sus Transiciones*/
function Estado(nombre,final,estado_to){
    this.nombre = nombre
    this.final = final // 0 no, 1 si
    this.estado_to = estado_to
}
/*-------------------------------------------------------------------------*/
/*Variables para primer autómata*/
const tablaTransicion1 = document.querySelector("#tablaTransicion1");

const entrada1 = document.querySelector("#entrada1");
const alfabeto1 = document.querySelector("#alfabeto1");
const iniciales1 = document.querySelector("#estadosIniciales1");
const finales1 = document.querySelector("#estadosFinales1");

var transiciones1 = ['Entrada','Lectura','Destino'];
var quintupla1 = [];
var est_Entrada1 =[];
var arr_alfabeto1 = [];
var est_Iniciales1 = [];
var est_Finales1 = [];

const enviar1 = document.querySelector("#Enviar1");
/* -------------------------------------------------------------------------- */
/*Variables para segundo autómata*/
const tablaTransicion2 = document.querySelector("#tablaTransicion2");

const entrada2 = document.querySelector("#entrada2");
const alfabeto2 = document.querySelector("#alfabeto2");
const iniciales2 = document.querySelector("#estadosIniciales2");
const finales2 = document.querySelector("#estadosFinales2");

var transiciones2 = ['Entrada','Lectura','Destino'];
var quintupla2 = [];
var est_Entrada2 =[];
var arr_alfabeto2 = [];
var est_Iniciales2 = [];
var est_Finales2 = [];

const enviar2 = document.querySelector("#Enviar2");
/* -------------------------------------------------------------------------------------------------------------------------------------------------- */
/*Creación del primer autómata*/
enviar1.addEventListener('click',ordenarElementosAutomata1);

function ordenarElementosAutomata1(e){
    e.preventDefault();
    var a = entrada1.value, b = alfabeto1.value, c = iniciales1.value, d = finales1.value;
    est_Entrada1 = a.split(',');
    arr_alfabeto1 = b.split(',');
    est_Iniciales1 = c.split(',');
    est_Finales1 = d.split(',');
    //quintupla1 = [est_Entrada1, arr_alfabeto1, est_Iniciales1, est_Finales1];
    enviar1.disabled = true;
    //console.log(quintupla1);
    crearTablatransicion1();
}

function crearTablatransicion1(){
    // e.preventDefault();
    var tabla_padre = document.createElement('table');
    var fila = document.createElement('tr');
    for(let i=0; i<3 ; i++){
        var columna_p = document.createElement('td');
        columna_p.style.width="200px";
        columna_p.style.height="50px";
        columna_p.style.textAlign="center";
        columna_p.style.backgroundColor="#cfd8dc";
        columna_p.textContent = transiciones1[i];
        fila.appendChild(columna_p);
    }
    tabla_padre.appendChild(fila);
 
    for(let j=0; j<(est_Entrada1.length * arr_alfabeto1.length) ; j++){
        var filas = document.createElement('tr');
        var columna_three = document.createElement('td');
        var input = document.createElement('input');
        for(let m=0; m<3; m++){
            var columna_one = document.createElement('td');
            var columna_two = document.createElement('td');
  
            columna_one.style.width="200px";
            columna_one.style.height="50px";
            columna_one.style.textAlign="center";
            columna_one.textContent = est_Entrada1[m];

            columna_two.style.width="200px";
            columna_two.style.height="50px";
            columna_two.style.textAlign="center";
            if(alfabeto1[m]!=undefined)
                columna_two.textContent = alfabeto1[m];
            
            columna_three.style.width="200px";
            columna_three.style.height="50px";
            columna_three.style.textAlign="center";
            input.className='form-control';
            columna_three.textContent = input;

            filas.appendChild(columna_three); 
            filas.appendChild(columna_one);
            filas.appendChild(columna_two);
        }
        tabla_padre.appendChild(filas);
    }
    
    tablaTransicion1.appendChild(tabla_padre);
}
/*--------------EJEMPLOOOOO-----------------------*/
//AUTOMATA FINITO DETERMINISTA
var entrada=["q1","q2","q3","q4","q5"], alfabeto=["a","b"], inicial= ["q5"], final= ["q2","q3","q4","q5"]
var estado=[]
estado[0]= {nombre:"q5",final:"1" ,estado_to:["q4","q3"]}
estado[1]= {nombre:"q4",final:"1",estado_to:["q4","q2"]}
estado[2]= {nombre:"q3",final:"1",estado_to:["q4","q1"]}
estado[3]= {nombre:"q2",final:"1",estado_to:["q4","q1"]}
estado[4]= {nombre:"q1",final:"0",estado_to:[null,"q1"]}

var AFDejemplo = {
    est_entrada: entrada,
    arr_alfabeto: alfabeto,
    est_iniciales: inicial,
    est_finales: final,
    arr_estados : estado,
}
console.log("EJEMPLO AFN")
console.log(AFDejemplo)

/*-----------------------------------------------------*/
function arr_estados(matriz1, matriz2,indice,afd){ //
    //console.log("Funcion arr_estados")  
    for (let i=0;i<indice-1;i++){
        matriz1[i]=afd[i]
    }
    for (let j=1;j<indice;j++){
        matriz2[j-1]=afd[j]
    }
}
function buscariEstado(nom_estado,AFDejemplo){
    //console.log("Funcion buscariEstados") //Busca el indice de un estado en arr_estados de la Quintupla del automata
    //console.log((AFDejemplo.arr_estados).length)
    for (let i=0;i<(AFDejemplo.arr_estados).length;i++){
        if((AFDejemplo.arr_estados)[i].nombre === nom_estado){
            //console.log(i)
            return i;
        }
    }
}
function semiMatriz(AFDejemplo,matriz,estado1,estado2){
    console.log("Funcion semiMatriz")  
    var indice = (AFDejemplo.est_entrada).length, aux_m =[],aux=1, e1, e2
    for (let i=0;i<indice;i++){
        for (let j=0;j<aux && aux<indice ;j++){ //columna, creo?
            //console.log("aux",aux)
            console.log("estado1",estado1[i], "estado2", estado2[j])
            e1=buscariEstado(estado1[i],AFDejemplo), e2=buscariEstado(estado2[j],AFDejemplo) 
            console.log("e1,e2 ",e1,e2)
            
           if(((AFDejemplo.arr_estados)[e1]).final !== (((AFDejemplo.arr_estados)[e2]).final)){
            console.log(((AFDejemplo.arr_estados)[e1]).final, " - ", (((AFDejemplo.arr_estados)[e2]).final))
                aux_m[j]="x";
                console.log("estados finales diferentes, x")
           }
           else{
                var f1,f2, k1,k2, cont =0
                //console.log("k ",(AFDejemplo.arr_alfabeto).length )
                for(let k=0;k<(AFDejemplo.arr_alfabeto).length;k++){
                    f1=(((AFDejemplo.arr_estados)[e1]).estado_to)[k], f2=(((AFDejemplo.arr_estados)[e2]).estado_to)[k] //f1,f2 estados_to de e1 y e2 
                    console.log(f1,f2)
                    if(f1==null || f2==null){
                        aux_m[j]="x";
                        console.log("null x")
                    }
                    else{
                        k1=buscariEstado(f1,AFDejemplo), k2=buscariEstado(f2,AFDejemplo)
                        console.log("k1,k2 ",k1,k2)
                        if(((AFDejemplo.arr_estados)[k1]).final === "1" && ((AFDejemplo.arr_estados)[k2]).final=== "1" || ((AFDejemplo.arr_estados)[k1]).final === "0" && ((AFDejemplo.arr_estados)[k2]).final=== "0"){
                            cont++;
                        }
                    }
                }
                if(cont === (AFDejemplo.arr_alfabeto).length ){
                    aux_m[j]= estado1[i];
                }
                else
                    aux_m[j]="x"
           }
        }
        matriz.push(aux_m)
        aux_m = []
        aux++;
        
    }
}
function Simplificar(AFDejemplo){
    //console.log("Funcion Simplificar")
    var matriz = [], estado1 = [], estado2 =[]
    var ar_estados= AFDejemplo.est_entrada  //Todos los estados disponibles
    arr_estados(estado1,estado2,ar_estados.length,ar_estados)
    //MatrizDiagonal(matriz,ar_estados.length-1)
    //
    semiMatriz(AFDejemplo,matriz,estado2,estado1)
    console.log(matriz)
}
Simplificar(AFDejemplo)

/* -------------------------------------------------------------------------------------------------------------------------------------------------- */



/*Creación del segundo autómata*/
enviar2.addEventListener('click',ordenarElementosAutomata2);

function ordenarElementosAutomata2(e){
    e.preventDefault();
    var a = entrada2.value, b = alfabeto2.value, c = iniciales2.value, d = finales2.value;
    est_Entrada2 = a.split(',');
    arr_alfabeto2 = b.split(',');
    est_Iniciales2 = c.split(',');
    est_Finales2 = d.split(',');
    quintupla2 = [est_Entrada1, arr_alfabeto1, est_Iniciales1, est_Finales1];
    enviar2.disabled = true;
    console.log(quintupla2);
    crearTablatransicion2();
}

function crearTablatransicion2(){
    // e.preventDefault();
    var tabla_padre = document.createElement('table');
    var fila = document.createElement('tr');
    for(let i=0; i<3 ; i++){
        var columna_p = document.createElement('td');
        columna_p.style.width="200px";
        columna_p.style.height="50px";
        columna_p.style.textAlign="center";
        columna_p.style.backgroundColor="#cfd8dc";
        columna_p.textContent = transiciones2[i];
        fila.appendChild(columna_p);
    }
    tabla_padre.appendChild(fila);
 
    for(let j=0; j<(entrada2.length * alfabeto2.length) ; j++){
        var filas = document.createElement('tr');
        var columna_three = document.createElement('td');
        var input = document.createElement('input');
        for(let m=0; m<3; m++){
            var columna_one = document.createElement('td');
            var columna_two = document.createElement('td');
  
            columna_one.style.width="200px";
            columna_one.style.height="50px";
            columna_one.style.textAlign="center";
            columna_one.textContent = est_Entrada2[m];

            columna_two.style.width="200px";
            columna_two.style.height="50px";
            columna_two.style.textAlign="center";
            if(alfabeto2[m]!=undefined)
                columna_two.textContent = alfabeto2[m];
            
            columna_three.style.width="200px";
            columna_three.style.height="50px";
            columna_three.style.textAlign="center";
            input.className='form-control';
            columna_three.textContent = input;

            filas.appendChild(columna_three); 
            filas.appendChild(columna_one);
            filas.appendChild(columna_two);
        }
        tabla_padre.appendChild(filas);
    }
    
    tablaTransicion2.appendChild(tabla_padre);
}





