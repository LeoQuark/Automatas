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

var aceptado1 = false , aceptado2 = false;

/*-------Creación del primer autómata------*/
const enviar1 = document.querySelector("#Enviar1");
enviar1.addEventListener('click',ordenarElementosAutomata1);
function ordenarElementosAutomata1(e){
    e.preventDefault();
    var a = entrada1.value.toLowerCase(), b = alfabeto1.value.toLowerCase(), 
        c = iniciales1.value.toLowerCase(), d = finales1.value.toLowerCase(), automata = tipoAutomata.value;;
    est_entrada = a.split(',');
    arr_alfabeto = b.split(',');
    est_inicial = c.split(',');
    est_finales = d.split(',');
    var validar = validarDatos(automata,est_entrada,arr_alfabeto,est_inicial,est_finales);
    if(validar != false){
        enviar1.disabled = true;
        crearTablaTransicion(est_entrada,arr_alfabeto,tablaTransicion1);
        aceptado1 = true;
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
        aceptado2 = true;
    }
}

/*----Validacion de los datos del 1er automata-----*/
function validarDatos(tipoautomata,entrada,alfabeto,inicial,final){
    var strAlert = `!! Error ¡¡\nNo puedes ingresar una ',' (coma) al final del input.\nDebes finalizar la  entrada con el ultimo dato.`,
        strAlertAll = `!! Error ¡¡\nPuede que hayas ingresado una palabra no valida en alguno de los input.\nPrueba reingresando los datos.`;
    if(tipoautomata === 'AFND'){
        for(let i=0; i<inicial.length; i++){
            let existeInicial = entrada.indexOf(inicial[i]);
            if(existeInicial == -1){
                alert(`!! Error ¡¡\nEl estado incial ' ${inicial[i]} ' no se encuentra presente en los estados ingresados.\nPor favor ingrese un estado inicial valido.`);
                return false;
            }
            if(inicial[i]===""){    
                alert(strAlert);    
                return false;
            }
            if(inicial[i] == 'null' || inicial[i] == 'undefined'){  
                alert(strAlertAll);     
                return false;
            }
        }
    }else{
        for(let i=0; i<inicial.length; i++){
            let existeInicial = entrada.indexOf(inicial[i]);
            if(inicial.length>1){
                alert(`!! Error ¡¡\nSolo puedes poner un estado inicial.`);    
                return false;
            }
            if(existeInicial == -1){
                alert(`!! Error ¡¡\nEl estado incial ' ${inicial[i]} ' no se encuentra presente en los estados ingresados.\nPor favor ingrese un estado inicial valido.`);
                return false;
            }
            if(inicial[i]===""){    
                alert(strAlert);    
                return false;
            }
            if(inicial[i] == 'null' || inicial[i] == 'undefined'){  
                alert(strAlertAll);     
                return false;
            }
        }
    }
    for(let m=0; m<entrada.length; m++){
        if(entrada[m]===""){    
            alert(strAlert);    
            return false;
        }
        if(entrada[m] == 'null' || entrada[m] == 'undefined'){  
            alert(strAlertAll);     
            return false;
        }
    }
    for(let m=0; m<alfabeto.length; m++){
        if(alfabeto[m]===""){   
            alert(strAlert);    
            return false;
        }
        if(alfabeto[m] == 'null' || alfabeto[m] == 'undefined'){  
            alert(strAlertAll);     
            return false;
        }
    }
    for(let j=0; j<final.length; j++){
        var existeFinal = entrada.indexOf(final[j]);
        if(existeFinal == -1){
            alert(`!! Error ¡¡\nEl estado incial ' ${final[j]} ' no se encuentra presente en los estados ingresados.\nPor favor ingrese un estado final valido.`);
            return false;
        }
        if(final[j]===""){ 
            alert(strAlert);    
            return false;}
        if(final[j] == 'null' || final[j] == 'undefined'){  
            alert(strAlertAll);    
            return false;
        }
    } 
}

/*------Tabla de transiciones con input----- */
function crearTablaTransicion(entrada,alfabeto,tablaTransicion){
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

/*------Eliminar seccion de Instrucciones-----*/
const aceptar = document.querySelector('#aceptar');
aceptar.addEventListener('click',function(e){
    e.preventDefault();
    const instrucciones = document.querySelector('#instrucciones').remove(); 
});

/*------Obtener el estado destino 1er automata-------*/
var Estados1 = [], estado_to1 = [], AUTOMATA1;
const datosTabla = document.querySelector('#datosTabla');
datosTabla.addEventListener('click',obtenerEstadosDestino1);

function obtenerEstadosDestino1(){
    var automata = tipoAutomata.value, validar = validarDatosTransicion(automata,est_entrada,arr_alfabeto);
    if(validar != false){
        datosTabla.disabled=true;
        AUTOMATA1 = crearAutomata(automata,est_entrada,arr_alfabeto,est_inicial,est_finales,Estados1,estado_to1);
        // console.log('PRIMER AUTOMATA ',AUTOMATA1);
    }
}

/*------Obtener el estado destino 2do automata-------*/
var Estados2 = [], estado_to2 = [], AUTOMATA2;
const datosTabla2 = document.querySelector('#datosTabla2');
datosTabla2.addEventListener('click',obtenerEstadosDestino2);

function obtenerEstadosDestino2(){
    var automata = tipoAutomata2.value, validar = validarDatosTransicion(automata,est_entrada2,arr_alfabeto2);
    if(validar != false){
        datosTabla2.disabled=true;
        AUTOMATA2 = crearAutomata(automata,est_entrada2,arr_alfabeto2,est_iniciales2,est_finales2,Estados2,estado_to2);
        // console.log('SEGUNDO AUTOMATA ',AUTOMATA2);
    }
}

function validarDatosTransicion(tipoautomata,entrada,alfabeto){
    var strAlertAll = `!! Error ¡¡\nPuede que hayas ingresado una palabra no valida en alguno de los input.\nPrueba reingresando los datos.`;
    for(let i=0; i<entrada.length; i++){
        for(let j=0; j<alfabeto.length; j++){
            var inputDestino = document.querySelector(`#${entrada[i]}-${alfabeto[j]}`).value.toLowerCase(),
                aux = entrada.indexOf(inputDestino);
            if(tipoautomata === 'AFD'){
                if(aux == -1){  
                    alert(strAlertAll);     
                    return false;
                }
                if(inputDestino == '' || inputDestino == 'null' || inputDestino == 'undefined'){
                    alert(strAlertAll);
                    return false;
                }
            }else{ // si es AFND
                var  largo = inputDestino.split(',');
                for(let i=0; i<largo.length; i++){
                    if(largo.length>1){
                        let auxi = entrada.indexOf(largo[i]);
                        if(auxi == -1){
                            alert(strAlertAll);
                            return false;
                        }
                    }
                }
                if(inputDestino == 'null' || inputDestino == 'undefined'){
                    alert(strAlertAll);
                    return false;
                }
                largo=[];
            }
        }
    }
}

function crearAutomata(tipoautomata,entrada,alfabeto,inicial,finales,Estados,estado){
    for(let i=0; i<entrada.length;i++){
        for(let j=0; j<alfabeto.length;j++){
            var inputDestino = document.querySelector(`#${entrada[i]}-${alfabeto[j]}`).value.toLowerCase();
            if(tipoautomata === 'AFD'){
                estado.push(inputDestino);
            }else{
                var totalEstados =[] , dividir;
                dividir = inputDestino.split(',');
                totalEstados.push(dividir);
                estado.push(totalEstados);
            }
        }
        var existe = finales.indexOf(entrada[i]);
        if(existe != -1 )
            Estados[i] = new Estado(entrada[i],true,estado);
        else
            Estados[i] = new Estado(entrada[i],false,estado);
        totalEstados=[];
        estado=[];
    }
    var automata = new Quintupla(entrada,alfabeto,inicial,finales,Estados);
    console.log(automata);
    return automata;  
}

/*----Crear tabla de transicion para mostrar los resultados----*/
function crearTablaTransicionResultados(automata,tablaTransicion){ 
    console.log('LEITO',automata);
    let transiciones = ['Entrada','Es Final','Lectura','Destino'];
    var tablaPadre = document.createElement('table'),
        filaTitulo = document.createElement('tr'); 

    for(let i=0; i<transiciones.length ; i++){
        var columnaTitulo = document.createElement('td');
        columnaTitulo.className='tablatransicion';
        columnaTitulo.textContent = transiciones[i];
        filaTitulo.appendChild(columnaTitulo);
    }
    tablaPadre.appendChild(filaTitulo);
    for(let i=0; i<automata.est_entrada.length; i++){
        for(let j=0; j<automata.arr_alfabeto.length; j++){
            var filaDatos = document.createElement('tr'), 
                columnaEstados = document.createElement('td'),
                columnaFinal = document.createElement('td'), 
                columnaAlfabeto = document.createElement('td'),
                columnaDestinos = document.createElement('td');
            //estilos y contenido a las columnas
            columnaEstados.className='tablatransicionHijos';
            columnaEstados.textContent = automata.est_entrada[i];
            columnaFinal.className='tablatransicionHijos';
            if( automata.arr_estados[i].final )
                columnaFinal.textContent = 'Si';
            else   
                columnaFinal.textContent = 'No';
            columnaAlfabeto.className='tablatransicionHijos';
            columnaAlfabeto.textContent = automata.arr_alfabeto[j];
            columnaDestinos.className='tablatransicionHijos';
            columnaDestinos.textContent = automata.arr_estados[i].estado_to[j];
            //agrego los elementos a sus nodos padres
            filaDatos.appendChild(columnaEstados);
            filaDatos.appendChild(columnaFinal);
            filaDatos.appendChild(columnaAlfabeto);
            filaDatos.appendChild(columnaDestinos);
            tablaPadre.appendChild(filaDatos);
        }
    }
    tablaTransicion.appendChild(tablaPadre);
}

/*-----Eliminar bloque de anlisis de los automatas-----*/
// const aceptar2 = document.querySelector('#aceptar2');
// aceptar2.addEventListener('click', uwu);

// function uwu (e){
//     e.preventDefault();
//     const instrucciones2 = document.querySelector('#instrucciones2').remove();
// }

/*-----1er automata Analisis-----*/


function pregunta1(){
    const introduccion = document.querySelector('#primerAutomata');
    if(tipoAutomata.value == 'AFD'){
        let descripcionAFD = `<p>Dado que se ingresó un autómata '<strong>${tipoAutomata.value}</strong>', se procede a realizar la simplificación:</p>`,
            simplificado1 ;  
        introduccion.innerHTML = descripcionAFD;
        console.log('PRIMER AUTOMATA ',AUTOMATA1);
        simplificado1 = Simplificar(AUTOMATA1);
        console.log('simplificado1:',simplificado1);
    }else{
        let descripcionAFD = `<p>Dado que se ingresó un autómata '<strong>${tipoAutomata.value}</strong>', se procede a obtener el AFD equivalente:</p>`,
            simplificado2 = [];
        introduccion.innerHTML = descripcionAFD;
    }
}


const resultado2 = document.querySelector('#resultado2');
resultado2.addEventListener('click',pregunta2);

function pregunta2(e){
    e.preventDefault();
    // const para el primer automata
    const resumenAutomatas1 = document.querySelector('#resumenAutomatas1'),
        transicionComplemento1 = document.querySelector('#transicionComplemento1'),
        transicionUnion1 = document.querySelector('#transicionUnion1');

    // const para el segundo automata
    const resumenAutomatas2 = document.querySelector('#resumenAutomatas2'),
        transicionComplemento2 = document.querySelector('#transicionComplemento2'),
        transicionUnion2 = document.querySelector('#transicionUnion2');
      
    let complemento1, complemento2, union1, union2;

    if(tipoAutomata2.value == 'AFD' && tipoAutomata2.value == 'AFD'){  
        let descripcion = `<p>Dado que ambos autómatas ingresados son '<strong>${tipoAutomata2.value}</strong>', se procede a obtener un autómata a partir del complemento, unión, concatenación e intersección entre ambos autómatas ingresados.</p>`;
        //primer automata AFD
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento1 = complemento(AUTOMATA1);
        resumenAutomatas1.innerHTML = descripcion +`<br>`+ titulo;
        crearTablaTransicionResultados(complemento1,transicionComplemento1);

        //segundo automata AFD
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento2 = complemento(AUTOMATA2);
        resumenAutomatas2.innerHTML = titulo;
        crearTablaTransicionResultados(complemento1,transicionComplemento2);
    }


    if(tipoAutomata.value == 'AFND' && tipoAutomata2.value == 'AFND'){
        let descripcion = `<p>Dado que ambos autómatas ingresados son '<strong>${tipoAutomata2.value}</strong>', se debe proceder a tranformar ambos autómatas a su <strong>AFD</strong> equivalente:</p>`;
        //primer automata AFND
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        resumenAutomatas.innerHTML = descripcion + titulo;
        complemento1 = complemento(AUTOMATA1);

        //segundo automata AFND
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        complemento2 = complemento(AUTOMATA2);
    }
    if(tipoAutomata.value == 'AFND' && tipoAutomata2.value == 'AFD'){
        let descripcion = `<p>Dado que el 1<sup>er</sup> Autómata es de tipo '<strong>${tipoAutomata.value}</strong>', se debe obtener su '<strong>AFD</strong>' equivalente:</p>`;
        //primer automataAFND
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        resumenAutomatas.innerHTML = descripcion;
        complemento1 = complemento(AUTOMATA1);

        //segundo automata AFD
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento2 = complemento(AUTOMATA2);
    }
    if(tipoAutomata.value == 'AFD' && tipoAutomata2.value == 'AFND'){
        let descripcion = `<p>Dado que el 2<sup>do</sup> Autómata es de tipo '<strong>${tipoAutomata2.value}</strong>', se debe obtener su '<strong>AFD</strong>' equivalente:</p>`;
        //primer automata AFD
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        resumenAutomatas.innerHTML = descripcion;
        complemento1 = complemento(AUTOMATA1);

        //segundo automata AFND
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        complemento2 = complemento(AUTOMATA2);
    }
    resultado2.disabled = true;
}

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
    for (let i=0;i<indice-1;i++){
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
    console.log(" AFDSimplificado, matriz simplificado",matriz)
    var aux=1, simplificado= true, n_estados = [], aux_m, AFDSimplificado
    for(let i=0;i<matriz.length;i++){
        console.log(aux, matriz.length+1)
        for (let j=0;j<aux && aux<matriz.length+1 ;j++){
            console.log("i",i,"j",j)
            for(let k=0;k<matriz[i][j].length;k++){
                console.log(matriz[i][j][k], "x")
                if((matriz[i][j])[k] != "x"){  //
                    console.log(matriz[i][j][k])
                    simplificado = false
                    if(k==0){
                        aux_m=matriz[i][j]
                        n_estados.push(matriz[i][j]);
                        console.log(matriz[i][j][k], simplificado)
                    }  
                }
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
    transiciones = Transiciones(AFD,estado,existe)
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
    // console.log("Funcion Simplificar")
    var matriz = [], estado1 = [], estado2 =[], AFDsimp;
    var ar_estados= AFDejemplo.est_entrada  //Todos los estados disponibles
    arr_estados(estado1,estado2,ar_estados.length,ar_estados)
    semiMatriz(AFDejemplo,matriz,estado2,estado1)
    AFDsimp = AFDSimplificado(AFDejemplo, matriz)
    // console.log("AFD SIMPLIFICADO",AFDsimp)
    return AFDsimp;
}
// Simplificar(AFDejemplo)

//COMPLEMENTO, UNION, CONCATENACION, INTERSECCION
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
    AFDComplemento.est_finales = n_finales;
    var AFDcomp = new Quintupla;
    AFDcomp = AFDComplemento;
    console.log('AFD Complemento:',AFDcomp);
    return AFDcomp;
}
/*---------UNION----------------*/
function UnirListas(Lista1, Lista2){
    var ListaFinal = [], ListaAux1 = []
    for(let i=0; i< Lista1.length; i++){
        ListaAux1.push(Lista1[i])
    }
    for(let j=0; j< Lista2.length; j++){
        for(let k=0; k< ListaAux1.length; k++){
            if(Lista2[j] === ListaAux1[k]){
                Lista2.splice(j,1)
            }
        }
    }
    ListaFinal = ListaAux1.concat(Lista2)
    return ListaFinal
}
function Estado_uwu(EstadoA,Estados, Alf,Alfabeto,AllEstados){ //retorna un objeto Estado
    var Nombre, Final, Estado_to = [], Estados_tof = [], Indice, Indice_Aux
    Indice =  AllEstados.indexOf(EstadoA.nombre)
    Nombre = Estados[Indice]
    Final = EstadoA.final
    for(let i=0; i<(EstadoA.estado_to).length; i++){
        Indice_Aux = AllEstados.indexOf((EstadoA.estado_to)[i])
        Estado_to.push(Estados[Indice_Aux])
    }
    for(let x=0; x<Alf.length; x++){
        Estados_tof[x] = null
    }
    for(let j=0; j<Alf.length; j++){
        for(let k=0; k<Alfabeto.length; k++){
            if(Alf[j] === Alfabeto[k]){
                Estados_tof[j]=Estado_to[k]
            }
        }
    }
    var Aux = new Estado(Nombre,Final,Estados_tof)
    return Aux
}
function Renombrar(A1,A2, Alf, Arr_Estados, Iniciales){
    var Estado1 = A1.arr_estados, Estado2 = A2.arr_estados
    var Estado_Aux1 = [], Estado_Aux2 = [], Estados = [], Asc = 66
    //Estados
    for(let i=0; i<Estado1.length; i++){
            Estado_Aux1.push(String.fromCharCode(Asc+i))
    }
    for(let j = Estado1.length; j<Estado2.length+Estado1.length; j++){
        Estado_Aux2.push(String.fromCharCode(Asc+j)) 
    }
    Estados = Estado_Aux1.concat(Estado_Aux2)
    console.log(Estados)
    //Arr_Estados
    for(let k=0; k<Estado1.length; k++){
        if(k < Estado1.length){
            Arr_Estados.push(Estado_uwu(Estado1[k],Estado_Aux1,Alf,A1.arr_alfabeto,A1.est_entrada))
        }
    }
    for(let l=0; l<Estado2.length; l++){
            Arr_Estados.push(Estado_uwu(Estado2[l],Estado_Aux2,Alf,A2.arr_alfabeto,A2.est_entrada))
    }

    var Nombre1, Nombre2, Indice1, Indice2
    var Nombre1 = A1.est_inicial, Nombre2 = A2.est_inicial
    Indice1 = A1.est_entrada.indexOf(Nombre1[0])
    Indice2 = A2.est_entrada.indexOf(Nombre2[0])
    Iniciales.push(Estados[Indice1]); Iniciales.push(Estados[(Estado1.length)+Indice2])
    return Estados

}
function Union(Automata1, Automata2){ //va a retornar la union de los dos automatas
    console.log("Union")
    var Alfabeto = [], Inicial = [], EstadoInicial_to = [], Iniciales = [], Finales = []
    //Alfabeto
    Alfabeto = UnirListas(Automata1.arr_alfabeto,Automata2.arr_alfabeto)
    Alfabeto.push("Ɛ")
    //Inicial
    Inicial = [String.fromCharCode(65)]
    //Entrada y arr_estados
    var Arr_Estados = [], Estados = []
    Estados = Renombrar(Automata1, Automata2, Alfabeto, Arr_Estados, Iniciales)
    Estados.unshift(Inicial[0])
    for(let i=0; i<Alfabeto.length; i++){
        EstadoInicial_to.push(null)
    }
    EstadoInicial_to[Alfabeto.length-1] = Iniciales
    var EstadoInicial = new Estado(Inicial[0],false,EstadoInicial_to)
    Arr_Estados.unshift(EstadoInicial)
    console.log(Arr_Estados)
    //Finales
    for(let j=0; j<Arr_Estados.length; j++){
        if((Arr_Estados[j]).final === true){
            Finales.push((Arr_Estados[j]).nombre)
        }
    }
    //Union de los Automatas
    var A1uA2 = new Quintupla(Estados,Alfabeto,Inicial,Finales,Arr_Estados)
    console.log(A1uA2)
}
//PARA LLAMAR A LA FUNCION : UNION(AUTOMATA1,AUTOMATA2)


/*-------Concatenación-------*/
/*--Función que concatena dos autómatas (por ahora funciona con ambos autómatas de igual alfabeto)*/
function Concatenacion (a, b){
    var entradaConcatenacion, alfabetoConcatenacion, inicialConcatenacion;      //Se crean variables
    var finalConcatenacion, estadoConcatenacion = [];
    var aux, contador = 0;
    aux = a.est_entrada + "," + b.est_entrada;      //Concatenación de los parámetros
    entradaConcatenacion = aux.split(",");
    aux = a.arr_alfabeto + "," + "epsilon";
    alfabetoConcatenacion = aux.split(",");
    inicialConcatenacion = a.est_inicial;
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
        est_inicial: inicialConcatenacion,
        est_finales: finalConcatenacion,
        arr_estados : estadoConcatenacion,
    }
    for (var m=0;m<AFDConcatenacion.arr_estados.length;m++){
        AFDConcatenacion.arr_estados[m].estado_to[AFDConcatenacion.arr_alfabeto.length-1] = null;
    }
    //Se concatenan los estados finales del autómata A con el inicial del autómata B
    for (var j=0;j<a.arr_estados.length;j++){   
        if (AFDConcatenacion.arr_estados[j].final == true){
            AFDConcatenacion.arr_estados[j].estado_to[AFDConcatenacion.arr_estados[j].estado_to.length-1] = b.est_inicial[0];
        }
    }
    //Se cambia el estado del autómata concatenado
    for (var j=0;j<a.arr_estados.length;j++){   
        if (AFDConcatenacion.arr_estados[j].final == true){
            AFDConcatenacion.arr_estados[j].final = false;
        }
    }
    return AFDConcatenacion;  //Se retorna el autómata para su posterior utilización sin afectar al autómata AFDejemplo uwu
}

/*--------------EJEMPLOOOOO  2 -----------------------*/
//AUTOMATA FINITO NO DETERMINISTA //
/*
var entrada=["q0","q1","q2","q3","q4"], alfabeto=["a","b"], inicial= ["q0"], final= ["q1"]
var estado=[];
estado[0]= {nombre:"q0",final:false,estado_to:[["q2","q1"],"q0"],epsilon:["q1"]};
estado[1]= {nombre:"q1",final:true, estado_to:["q4","q1"],epsilon:[null]};
estado[2]= {nombre:"q2",final:false,estado_to:["q0",null],epsilon:[null]};
estado[3]= {nombre:"q3",final:false,estado_to:["q1",null],epsilon:[null]};
estado[4]= {nombre:"q4",final:false,estado_to:["q3",null],epsilon:[null]};

var AFDejemplo = {
   est_entrada: entrada,
   arr_alfabeto: alfabeto,
   est_iniciales: inicial,
   est_finales: final,
   arr_estados : estado,
}
console.log("EJEMPLO AFN")
console.log(AFDejemplo)

/*-------------------Equivalencia    ------------------*/
/*
function wea(estado){
   console.log(Array.isArray(estado[0].epsilon[0]))

   console.log(estado[0].epsilon[0].length)
}
wea(AFDejemplo.arr_estados)
function buscar_estado(entrada2,estado2,nomb){
   for (var i = 0; i<entrada2.lenght;i++){
       if(estado2[i].nombre === nomb  ){
           return i;}}}
function encontrar(auxi,nomb){
   var aux = 0
   for (i=0;i<auxi.length;i++){
       if(auxi[i]===nomb){
           aux++;
       }}
   if (aux===0){
       return nomb;
   }
}
function buscar_alfab(entrada2, estado2, nomb, alfab){    

               var aux;
               var auxi = [];
               var i;
               var j = buscar_estado(entrada2,estado2,nomb);
               aux = estado2[j].estado_to[alfa];
               while( i!= null )
                   if(estado2[j].epsilon != null){
                       auxi.push(buscar_estado(entrada2,estado2,estado2[j].epsilon));
                       aux += "," +  estado2[auxi].estado_to[alfa];
               }
                   else
                       auxi = buscar_estado(entrada2,estado2,estado2[j].epsilon);
                       if(estado2[auxi].epsilon != null){

                   }
                       else
                           return auxi
               }
/*                while(i<entrada2.length){
                  if(estado2[i].epsilon!=null){
                       if(aux===null){
                           epsi = estado2[i].epsilon;
                           i++;
                           if(estado2[i].nombre === nomb){
                               aux = estado2[i].estado_to[alfab];
                               i=0;}}
                           
                       if(aux!=null){
                           if(estado2[i].nombre===epsi){
                               epsi = estado2[i].epsilon;
                               aux += (",") + estado2[i].estado_to[alfab];}
                           i+=1}}

                   if(estado2[i].epsilon===null){ 
                       if (aux===null){
                           i+=1;
                           if(estado2[i].nombre===nomb){
                               aux = estado2[i].estado_to[alfab];
                               i=0;}}

                       if(aux!=null){
                           console.log(epsi);    
                           if(estado2[i].nombre===epsi){
                               aux += (",") + estado2[i].estado_to[alfab];
                              }i+=1;}}
                   }
       return aux;*/

       
                  

/*-----------------------------------------------------*/

/*-------------------Equivalencia    ------------------*/
/*
var tablaTransiciones;
var tablaClausuraEpsilon = [];
for (let i = 0; i < AFDejemplo.est_entrada.length; i++){
    tablaClausuraEpsilon.push(ClausuraEpsilon( AFDejemplo.est_entrada, AFDejemplo.arr_estados, AFDejemplo.est_entrada[i]));
}
tablaTransiciones = Tabla_Transición(AFDejemplo.arr_estados, AFDejemplo.est_entrada,AFDejemplo.arr_alfabeto)
console.log(tablaClausuraEpsilon)
console.log(tablaTransiciones)

function compararArreglos(arregloA, arregloB){// se enviaran arreglos ordenados
    if(arregloA.length!=arregloB.length){
        return false
    }else{
        for(let i=0; i<arregloA.length;i++){
            if(arregloA[i]!=arregloB[i]){
                return false;
            }
        }
    }
    return true
}
function ArregloEsta(estado, ArregloEstados){
    for(let i=0; i<ArregloEstados.length;i++){
        if(compararArreglos(estado,ArregloEstados[i])){
            return true;
        }
    }return false;
}
function TablaEquivalencia(Transiciones, ClausurasEpsilon, EstadoInicialAutomata){
    let RecorrerEstados = false;
    let CantidadEstados = 0;
    let cantidadAlfabeto = Transiciones.length-2
    var TablaRetorno = [];
    var TransicionesAlfabeto = [];
    let EstadoActual = [];
    let transiciones = [];
    var PosActual;
    var Alcances;
    var index;

    for (let i = 0; i< EstadoInicialAutomata.length; i++){ // agregar primer estado, juntando los iniciales
        EstadoActual.push(EstadoInicialAutomata[i]);
        var aux = tablaClausuraEpsilon[Transiciones[0].indexOf(EstadoInicialAutomata[i])]
        EstadoActual.push(aux[0])
    }
    TransicionesAlfabeto.push(EstadoActual);

    while (!RecorrerEstados){
        transiciones=[];
        EstadoActual=[];
        EstadoActual=TransicionesAlfabeto[CantidadEstados];
        transiciones.push(EstadoActual);
        for(let i=0; i<cantidadAlfabeto;i++){ 
            Alcances = [];
            for (let j=0; j<EstadoActual.length;j++){ // se agregan los alcances con el alfabeto desde los estados
                PosActual = Transiciones[0].indexOf(EstadoActual[j]);
                let auxilia = Transiciones[i+2][PosActual];
                if(Array.isArray(auxilia)===true){
                    for (let k=0; k<auxilia.length;k++){
                        if((auxilia[k] != null) && (!BuscarEstado(auxilia[k],Alcances))){
                            Alcances.push(auxilia[k]);}}}
                else{
                    if((auxilia != null) && (!BuscarEstado(auxilia,Alcances))){
                        Alcances.push(auxilia);}
                }           
            }             

            for (let j=0; j<EstadoActual.length;j++){ // se agregan los alcances; epsilon -> alfabeto
                PosActual = Transiciones[0].indexOf(EstadoActual[j]);
                for(let k=0; k<ClausurasEpsilon[PosActual].length; k++){
                    index = Transiciones[0].indexOf(ClausurasEpsilon[PosActual][k]);
                    if((Transiciones[i+2][index] != null) && (!BuscarEstado(Transiciones[i+2][index],Alcances))){
                        Alcances.push(Transiciones[i+2][index]);
                    }
                }
            }                
            for (let j=0; j<Alcances.length;j++){ // se agregan los alcances epsilon -> alfabeto -> epsilon
                PosActual = Transiciones[0].indexOf(Alcances[j]);
                for(let k=0; k<ClausurasEpsilon[PosActual].length; k++){ // ClausurasEpsilon[PosActual][k]
                    if( (ClausurasEpsilon[PosActual][k]!=null) && (!BuscarEstado(ClausurasEpsilon[PosActual][k],Alcances))){
                        Alcances.push(ClausurasEpsilon[PosActual][k]);
                    }  
                }
            }                
            Alcances.sort();
            if(!ArregloEsta(Alcances,TransicionesAlfabeto)){
                TransicionesAlfabeto.push(Alcances);
            }
            //verificar si alcance es un estado nuevo y agregarlo a TransicionesAlfabeto
            transiciones.push(Alcances);        
        }
        TablaRetorno.push(transiciones);
        CantidadEstados++;
        if(CantidadEstados >= TransicionesAlfabeto.length){
            RecorrerEstados = true;
        }
    } 
    //agregar sumideros
    for(let i=0; i<TablaRetorno.length; i++){
        for(let j=0; j<TablaRetorno[i].length;j++){
            if (TablaRetorno[i][j].length==0){
                TablaRetorno[i][j].push("S");
            }
        }
    }
    return TablaRetorno;
}
console.log("Tabla Equivalencias")
console.log(TablaEquivalencia(tablaTransiciones, tablaClausuraEpsilon, AFDejemplo.est_iniciales))

function Tabla_Transición(estado2,entrada2,alfabeto2){
    let Tabla = new Array(alfabeto2.length+2);
    let k = 0;
    Tabla[0] = [estado2[0].nombre];
    Tabla[1] = [estado2[0].epsilon];
    for (var i=1; i < entrada2.length; i++){
        Tabla[0].push(estado2[i].nombre);
        Tabla[1].push(estado2[i].epsilon);
        }
    for(var j=2; j<Tabla.length;j++){
        for(var z = 0; z<entrada2.length ; z++){
            if(z === 0){
                Tabla[j] = [estado2[z].estado_to[k]];
                }
            else
                Tabla[j].push(estado2[z].estado_to[k])}
        k++;}
    return Tabla;
}


function Tabla_Epsilon(estado2,entrada2){
    let Tabla = [];
    Tabla[0] = [estado2[0].nombre];
    Tabla[1] = [ClausuraEpsilon(entrada2, estado2, estado2[0].nombre)]
    for(var i = 1; i<entrada2.length; i++){
        (Tabla[0]).push(estado2[i].nombre);
        (Tabla[1]).push(ClausuraEpsilon(entrada2, estado2 , estado2[i].nombre));
    }
    return Tabla;
}

function BuscarEstado(estado, arregloEstados){
    for (let i=0; i<arregloEstados.length; i++){
        if(arregloEstados[i]===estado){
             return true;
        }
    }
    return false
}
    
function ClausuraEpsilon(EstadosEntrada, Estadosinfo, Estado){  
    let EpsilonFinal = false;
    let EpsilonCaminos = [];
    let recorrerEpsilon = 0;
    let InfoEstadoActual=Estadosinfo[EstadosEntrada.indexOf(Estado)];
    let PosActual=EstadosEntrada.indexOf(Estado)
    if(InfoEstadoActual.epsilon[0]==null){
        EpsilonCaminos[0]=null;
        return EpsilonCaminos;
    }
    while(!EpsilonFinal){
        if(Estadosinfo[PosActual].epsilon[0] != null){
            for (let i=0; i<Estadosinfo[PosActual].epsilon.length ; i++){
                if((!BuscarEstado(Estadosinfo[PosActual].epsilon[i],EpsilonCaminos)) && (Estado != Estadosinfo[PosActual].epsilon[i])){
                        EpsilonCaminos.push(Estadosinfo[PosActual].epsilon[i]); 
                    }
                }
            }       
            PosActual=EstadosEntrada.indexOf(EpsilonCaminos[recorrerEpsilon]);
            InfoEstadoActual=Estadosinfo[PosActual];
            recorrerEpsilon++;
            if(recorrerEpsilon>EpsilonCaminos.length){
                EpsilonFinal=true;
            }
        }
        return EpsilonCaminos;
    }
//Ejemplo ejecucion funcion
console.log("Camino Epsilon")
console.log(ClausuraEpsilon(AFDejemplo.est_entrada, AFDejemplo.arr_estados, "q0"))
console.log(Tabla_Epsilon(AFDejemplo.arr_estados,AFDejemplo.est_entrada))
console.log(Tabla_Transición(AFDejemplo.arr_estados,AFDejemplo.est_entrada,AFDejemplo.arr_alfabeto))