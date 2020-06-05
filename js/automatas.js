/*Constructores*/
//Quintupla
function Quintupla(est_entrada,arr_alfabeto,est_iniciales,est_finales,arr_estados){
    this.est_entrada = est_entrada
    this.arr_alfabeto = arr_alfabeto
    this.est_inicial = est_iniciales
    this.est_finales = est_finales
    this.arr_estados = arr_estados
}
//Estados con sus Transiciones
function Estado(nombre,final,estado_to){
    this.nombre = nombre
    this.final = final // true or false
    this.estado_to = estado_to
}
/*---------Variables para primer autómata----------*/
const tablaTransicion1 = document.querySelector("#tablaTransicion1");
const tipoAutomata = document.querySelector('#tipoAutomata1');
const entrada1 = document.querySelector("#entrada1");
const alfabeto1 = document.querySelector("#alfabeto1");
const iniciales1 = document.querySelector("#estadosIniciales1");
const finales1 = document.querySelector("#estadosFinales1");

var transiciones = ['Entrada','Lectura','Destino'];
var est_entrada = [], arr_alfabeto = [], est_inicial = [], est_finales = [];

/*-------Variables para segundo autómata----------*/
const tablaTransicion2 = document.querySelector("#tablaTransicion2");
const tipoAutomata2 = document.querySelector('#tipoAutomata2');
const entrada2 = document.querySelector("#entrada2");
const alfabeto2 = document.querySelector("#alfabeto2");
const iniciales2 = document.querySelector("#estadosIniciales2");
const finales2 = document.querySelector("#estadosFinales2");
var quintupla2 = [], est_entrada2 =[], arr_alfabeto2 = [], est_iniciales2 = [], est_finales2 = [];

/*-------Creación del primer autómata------*/
const enviar1 = document.querySelector("#Enviar1");
enviar1.addEventListener('click',ordenarElementosAutomata1);
function ordenarElementosAutomata1(e){
    e.preventDefault();
    var a = entrada1.value.toLowerCase(), b = alfabeto1.value.toLowerCase(), 
        c = iniciales1.value.toLowerCase(), d = finales1.value.toLowerCase(), automata = tipoAutomata.value;
    est_entrada = a.split(',');
    arr_alfabeto = b.split(',');
    est_inicial = c.split(',');
    est_finales = d.split(',');
    var validar = validarDatos(automata,est_entrada,arr_alfabeto,est_inicial,est_finales);
    if(validar != false){
        enviar1.disabled = true;
        crearTablaTransicion(est_entrada,arr_alfabeto,tablaTransicion1);
    }
}

/*-------Creación del segundo autómata-------*/
const enviar2 = document.querySelector("#Enviar2");
enviar2.addEventListener('click',ordenarElementosAutomata2);
function ordenarElementosAutomata2(e){
    e.preventDefault();
    var a = entrada2.value.toLowerCase(), b = alfabeto2.value.toLowerCase(), 
        c = iniciales2.value.toLowerCase(), d = finales2.value.toLowerCase(), automata = tipoAutomata2.value;
    est_entrada2 = a.split(',');
    arr_alfabeto2 = b.split(',');
    est_iniciales2 = c.split(',');
    est_finales2 = d.split(',');
    var validar = validarDatos(automata,est_entrada2,arr_alfabeto2,est_iniciales2,est_finales2);
    if(validar != false){
        enviar2.disabled = true;
        crearTablaTransicion(est_entrada2,arr_alfabeto2,tablaTransicion2);
    }
}

/*----Validacion de los datos del 1er automata-----*/
function validarDatos(automata,entrada,alfabeto,inicial,final){
    var strAlert = `!! Error ¡¡\nNo puedes ingresar una ',' (coma) al final del input.\nDebes finalizar la  entrada con el ultimo dato.`,
        strAlertAll = `!! Error ¡¡\nPuede que hayas ingresado una palabra no valida en alguno de los input.\nPrueba reingresando los datos.`;
    
    if(automata === 'AFD'){
        for(let i=0; i<alfabeto.length; i++){
            if(alfabeto[i] == 'e'){
                alert(`!! Error ¡¡\nEl automata es '${automata}', no puedes ocupar como alfabeto la palabra reservada 'e' (epsilon).\nIngresa un alfabeto sin esta letra.`);
                return false;}
        }
    }
    if(automata === 'AFND'){
        var aux = alfabeto.indexOf('e');
        if(aux == -1){
            alert(`!! Error ¡¡\nEl automata es '${automata}', DEBES ocupar dentro de tu alfabeto la palabra reservada 'e' (epsilon).\nIngresa un alfabeto con esta letra.`);
            return false;}
    }
    for(let m=0; m<entrada.length; m++){
        if(entrada[m]===""){    alert(strAlert);    return false;}
        if(entrada[m] == 'null' || entrada[m] == 'undefined'){  alert(strAlertAll);     return false;}
    }
    for(let m=0; m<alfabeto.length; m++){
        if(alfabeto[m]===""){   alert(strAlert);    return false;}
        if(alfabeto[m] == 'null' || alfabeto[m] == 'undefined'){  alert(strAlertAll);     return false;}
    }
    for(let i=0; i<inicial.length; i++){
        var existeInicial = entrada.indexOf(inicial[i]);
        if(existeInicial == -1){
            alert(`!! Error ¡¡\nEl estado incial ' ${inicial[i]} ' no se encuentra presente en los estados ingresados.\nPor favor ingrese un estado inicial valido.`);
            return false;}
        if(inicial[i]===""){    alert(strAlert);    return false;}
        if(inicial[i] == 'null' || inicial[i] == 'undefined'){  alert(strAlertAll);     return false;}
    }
    for(let j=0; j<final.length; j++){
        var existeFinal = entrada.indexOf(final[j]), seRepite = inicial.indexOf(final[j]);
        if(existeFinal == -1){
            alert(`!! Error ¡¡\nEl estado incial ' ${final[j]} ' no se encuentra presente en los estados ingresados.\nPor favor ingrese un estado final valido.`);
            return false;}
        // if(seRepite == -1){   alert(strAlertAll);   return false;}
        if(final[j]===""){  alert(strAlert);    return false;}
        if(final[j] == 'null' || final[j] == 'undefined'){  alert(strAlertAll);     return false;}   
    }
}

/*------Tabla de transiciones con input----- */
function crearTablaTransicion(entrada,alfabeto,tablaTransicion){
    // e.preventDefault();
    var tablaPadre = document.createElement('table'),
        filaTitulo = document.createElement('tr');
    for(let i=0; i<transiciones.length ; i++){
        var columnaTitulo = document.createElement('td');
        columnaTitulo.className='formatoTablaTitulo';
        columnaTitulo.textContent = transiciones[i];
        filaTitulo.appendChild(columnaTitulo);
    }
    tablaPadre.appendChild(filaTitulo);
    for(let i=0; i<entrada.length; i++){
        for(let j=0; j<alfabeto.length; j++){
            var filaDatos = document.createElement('tr'), 
                columnaEstados = document.createElement('td'), 
                columnaAlfabeto = document.createElement('td'),
                columnaInput = document.createElement('td'),
                input = document.createElement('input');
            //estilos y contenido a las columnas
            columnaEstados.className='formatoTabla';
            columnaEstados.textContent = entrada[i];
            columnaAlfabeto.className='formatoTabla';
            columnaAlfabeto.textContent = alfabeto[j];
            input.className='form-control';
            input.setAttribute('placeholder','Estado Destino');
            input.setAttribute('type','text');
            input.id=`${entrada[i]}-${alfabeto[j]}`;
            //agrego los elementos a sus nodos padres
            columnaInput.appendChild(input);
            filaDatos.appendChild(columnaEstados);
            filaDatos.appendChild(columnaAlfabeto);
            filaDatos.appendChild(columnaInput);
            tablaPadre.appendChild(filaDatos);
        }
    }
    tablaTransicion.appendChild(tablaPadre);
}

/*------Obtener el estado destino 1er automata-------*/
var Estados1 = [], estado_to1 = [];
const datosTabla = document.querySelector('#datosTabla');
datosTabla.addEventListener('click',obtenerEstadosDestino);

function obtenerEstadosDestino(){
    for(let i=0; i<est_entrada.length;i++){
        for(let j=0; j<arr_alfabeto.length;j++){
            var inputDestino = document.querySelector(`#${est_entrada[i]}-${arr_alfabeto[j]}`),
                valorDestino = inputDestino.value;
            estado_to1.push(valorDestino);
        }
        // si el estado es final y esta dentro del arreglo estados iniciales retorna != -1
        var existe = est_finales.indexOf(est_entrada[i]);
        if(existe != -1 )
            Estados1[i] = new Estado(est_entrada[i],true,estado_to1);
        else
            Estados1[i] = new Estado(est_entrada[i],false,estado_to1);
        
        estado_to1=[];
        console.log(Estados1[i]);
    }
    var AUTOMATA1 = new Quintupla(est_entrada, arr_alfabeto, est_inicial,est_finales,Estados1)
console.log(AUTOMATA1);
}












/*--------------EJEMPLOOOOO-----------------------*/
//AUTOMATA FINITO DETERMINISTA
//EJEMPLO1
/*
var entrada=["q1","q2","q3","q4","q5"], alfabeto=["a","b"], inicial= ["q5"], final= ["q2","q3","q4","q5"]
var estado=[]
estado[0]= {nombre:"q5",final:true ,estado_to:["q4","q3"]}
estado[1]= {nombre:"q4",final:true,estado_to:["q4","q2"]}
estado[2]= {nombre:"q3",final:true,estado_to:["q4","q1"]}
estado[3]= {nombre:"q2",final:true,estado_to:["q4","q1"]}
estado[4]= {nombre:"q1",final:false,estado_to:["q1","q1"]}  */
//EJEMPLO 2 
/*
var entrada=["q0","q1","q2","q3","q4"], alfabeto=["a","b"], inicial= ["q0"], final= ["q1","q3"]
var estado=[]
estado[0]= {nombre:"q0",final:false ,estado_to:["q1","q3"]}
estado[1]= {nombre:"q1",final:true,estado_to:["q2","q1"]}
estado[2]= {nombre:"q2",final:false,estado_to:["q1","q2"]}
estado[3]= {nombre:"q3",final:true,estado_to:["q4","q3"]}
estado[4]= {nombre:"q4",final:false,estado_to:["q3","q4"]} 
*/
//EJEMPLO 3
var entrada=["q","q0","q1","q2","q3","q4"], alfabeto=["a","b"], inicial= ["q"], final= ["q1","q3"]
var estado=[]
estado[0]= {nombre:"q",final:false ,estado_to:["q0","q0"]}
estado[1]= {nombre:"q0",final:false ,estado_to:["q1","q3"]}
estado[2]= {nombre:"q1",final:true,estado_to:["q2","q1"]}
estado[3]= {nombre:"q2",final:false,estado_to:["q1","q2"]}
estado[4]= {nombre:"q3",final:true,estado_to:["q4","q3"]}
estado[5]= {nombre:"q4",final:false,estado_to:["q3","q4"]} 

var AFDejemplo = {
    est_entrada: entrada,
    arr_alfabeto: alfabeto,
    est_inicial: inicial,
    est_finales: final,
    arr_estados : estado,
}
//console.log("EJEMPLO AFN",AFDejemplo)

/*-----------Simplificacion-----------------*/
/*Funcion para simplificar un automata*/ 

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
                        if(((AFDejemplo.arr_estados)[k1]).final === true && ((AFDejemplo.arr_estados)[k2]).final=== true || ((AFDejemplo.arr_estados)[k1]).final === false && ((AFDejemplo.arr_estados)[k2]).final=== false){
                            cont++;
                        }
                    }
                }
                if(cont === (AFDejemplo.arr_alfabeto).length ){
                    aux_m[j]= [estado1[i],estado2[j]];
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
function AFDSimplificado(AFD,matriz){
    console.log("matriz simplificado",matriz)
    var aux=1, simplificado= true, n_estados = [], aux_m, AFDSimplificado
    for(let i=0;i<matriz.length;i++){
        for (let j=0;j<aux && aux<matriz.length ;j++){
            
            if(matriz[i][j] != "x"){
                simplificado = false
                aux_m=matriz[i][j]
               // console.log(i,j,matriz[i][j])
                n_estados.push(matriz[i][j]);
            }
        }
        aux++;
    }
    console.log("simplificado", simplificado)
    console.log("estados simplificados", n_estados)
    /*------ Quintupla automata simplificado------*/
    if(simplificado === true){
        //return AFD;
    }
    else{
        var inicial = [], alfabeto = [], estados = [], existe = false, finales = [], transiciones = []
        //INICIAL
        for(let i=0;i<n_estados.length;i++){
            console.log(n_estados[i], "-" ,AFD.est_inicial[0])
            for(let j=0;j<n_estados[i].length;j++){
                if(AFD.est_inicial[0] === n_estados[i][j]){
                    inicial.push(n_estados[i])
                    existe=true //no esta dentro de n_estados
                    console.log("iguales")
                }
            }
        }
        //ALFABETO
        alfabeto = AFD.arr_alfabeto
        //ESTADOS
        if(existe===false){
            estados.push(AFD.est_inicial[0])
            inicial.push(AFD.est_inicial[0])
        }
        for(let i=0;i<n_estados.length;i++){
            estados.push(n_estados[i])

        }
        console.log(inicial);
        console.log(estados);
        //ESTADOS FINALES
        let k;
        if(existe===false){k=1} else{k=0}
        for(k;k<estados.length;k++){
            var b=(estados[k]).length
            //console.log(b)
            for(let l=0;l<(AFD.est_finales).length;l++){
                //console.log(estados[k][b], "--", AFD.est_finales[l])
                if(estados[k][b-2]===AFD.est_finales[l] || estados[k][b-2]===AFD.est_finales[l] ){
                    finales.push(estados[k])
                }   
            }   
        }
        console.log(finales)
    }
    transiciones = Transiciones(AFD,estados)
    //console.log("transiciones",transiciones)
    var AFDSimplificado = new Quintupla(estados,alfabeto,inicial,finales,transiciones)
    return AFDSimplificado
}
function Transiciones(AFD,estados,bool){
    console.log(estados)
    var arr_estados = []
    let i
    if(bool == false){
        i=1
        for(let j=0;j<(AFD.arr_estados).length;j++){
            if(estados[0] === ((AFD.arr_estados)[j]).nombre){
                console.log((AFD.arr_estados)[j])
                arr_estados.push((AFD.arr_estados)[j])
            }
        }
    }
    else{i=0}
    for(i;i<estados.length;i++){
        var aux= estados[i].length
        for(let j=0;j<(AFD.arr_estados).length;j++){
            if(estados[i][0] === ((AFD.arr_estados)[j]).nombre){
                var aux_estado = (AFD.arr_estados)[j]
                aux_estado.nombre=estados[i]
                arr_estados.push(aux_estado)
            }
        }
    }
    console.log(arr_estados)
    return arr_estados
}
function Simplificar(AFDejemplo){
    //console.log("Funcion Simplificar")
    var matriz = [], estado1 = [], estado2 =[], AFDsimp
    var ar_estados= AFDejemplo.est_entrada  //Todos los estados disponibles
    arr_estados(estado1,estado2,ar_estados.length,ar_estados)
    semiMatriz(AFDejemplo,matriz,estado2,estado1)
    AFDsimp = AFDSimplificado(AFDejemplo, matriz)
    console.log("AFD SIMPLIFICADO",AFDsimp)
    //return AFDSimp
}
Simplificar(AFDejemplo)
/*-----------------------------*/

/*------------Complemento-----------*/
function complemento(AFD){
    var AFDComplemento = JSON.parse(JSON.stringify(AFD)), n_finales = []
    for(let i=0;i<(AFDComplemento.arr_estados).length;i++){
        if(((AFDComplemento.arr_estados)[i]).final === true){
            ((AFDComplemento.arr_estados)[i]).final = false
        }
        else{
            ((AFDComplemento.arr_estados)[i]).final = true
        }
    }
    for(let j=0;j<(AFDComplemento.arr_estados).length;j++){
        if(((AFDComplemento.arr_estados)[j]).final === true){
            n_finales.push(((AFDComplemento.arr_estados)[j]).nombre)
        } 
    }
    AFDComplemento.est_finales = n_finales
    return AFDComplemento
}
function llamarComplemento(AFD){
    var AFDcomp = new Quintupla
    AFDcomp = complemento(AFD)

    console.log("AFD ORIGINAL",AFDejemplo)
    console.log("COMPLEMENTO",AFDcomp)
}
//llamarComplemento(AFDejemplo)







/*-------Concatenación-------*/
/*--Función que concatena dos autómatas (por ahora funciona con ambos autómatas de igual alfabeto)*/

function Concatenación (a, b){
    var entradaConcatenacion, alfabetoConcatenacion, inicialConcatenacion;      //Se crean variables
    var finalConcatenacion, estadoConcatenacion = [];
    var aux, contador = 0;
    
    aux = a.est_entrada + "," + b.est_entrada;      //Concatenación de los parámetros
    entradaConcatenacion = aux.split(",");
    aux = a.arr_alfabeto + "," + "epsilon";
    alfabetoConcatenacion = aux.split(",");
    inicialConcatenacion = a.est_iniciales;
    aux = a.est_finales + "," + b.est_finales;
    finalConcatenacion = aux.split(",");
    for (var i=0;i<a.arr_estados.length;i++){
        estadoConcatenacion[contador] = a.arr_estados[i];
        contador++;
    }
    for (var i=0;i<b.arr_estados.length;i++){
        estadoConcatenacion[contador] = b.arr_estados[i];
        contador++;
    }
    
    var AFDConcatenacion = {                        //Se crea un nuevo autómata definido
        est_entrada: entradaConcatenacion,
        arr_alfabeto: alfabetoConcatenacion,
        est_iniciales: inicialConcatenacion,
        est_finales: finalConcatenacion,
        arr_estados : estadoConcatenacion,
    }
    for (var m=0;m<AFDConcatenacion.arr_estados.length;m++){
        AFDConcatenacion.arr_estados[m].estado_to[AFDConcatenacion.arr_alfabeto.length-1] = null;
    }
    //Finalmente se concatenan los estados INICIALES 
    for (var j=0;j<AFDConcatenacion.arr_estados.length;j++){   
        if (AFDConcatenacion.arr_estados[j].nombre == AFDConcatenacion.est_iniciales){
            AFDConcatenacion.arr_estados[j].estado_to[AFDConcatenacion.arr_estados[j].estado_to.length-1] = b.est_iniciales[0];
        }
    }
    
    return AFDConcatenacion;  //Se retorna el autómata para su posterior utilización sin afectar al autómata AFDejemplo uwu
}

//console.log(Concatenacion(AFDejemplo, AFDejemplo));
/*Agregué en este caso al alfabeto la palabra vacía "epsilon", por si ven que estado_to tienen al
final el elemento null, es porque como el estado inicial por ejemplo:

    estado.nombre = q1
    alfabeto  = [    a   ,   b   ,   epsilon ]
    estado_to = [   q2  ,   q1  ,   null    ]
    
    q1-----a------>q2
    q1-----b------>q1
    q1----epsilon----->null (no existe)
    
Caso contrario, si al final no está el null:

    estado.nombre = q1
    alfabeto  = [    a   ,   b   ,   epsilon ]
    estado_to = [   q2  ,   q1  ,   q3    ]
    
    q1-----a------>q2
    q1-----b------>q1
    q1----epsilon----->q3 (si la palabra vacía es leída se va a q3)

*/
/*-----------------------------------------------------------------------------*/



