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
function EstadoN(nombre,final,estado_to,epsilon){
    this.nombre = nombre
    this.final = final // true or false
    this.estado_to = estado_to
    this.epsilon = epsilon
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
    return automata;
    // console.log(automata);  
}

function crearTablaDeEstados(automata,resultado){
    let titulos = ['Inicial','Final','Estados'];
    var tablaEstados=`
    <table>
        <tr>
            <td class='tablatransicion'>${titulos[0]}</td>
            <td class='tablatransicion'>${titulos[1]}</td>
            <td class='tablatransicion'>${titulos[2]}</td>
        </tr>
        <tr>
            <td class='tablatransicionHijos'>${automata.est_inicial}</td>
            <td class='tablatransicionHijos'>${automata.est_finales}</td>
            <td class='tablatransicionHijos'>${automata.est_entrada}</td>
        </tr>
    </table>`;
    resultado.innerHTML = tablaEstados;
}

/*----Crear tabla de transicion para mostrar los resultados----*/
function crearTablaTransicionResultados(automata,resultado){ 
    let transiciones = ['Entrada','Lectura','Destino'];
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
                columnaAlfabeto = document.createElement('td'),
                columnaDestinos = document.createElement('td');
            
            if(automata.arr_estados[i].estado_to[j] != null){
                //estilos y contenido a las columnas
            columnaEstados.className='tablatransicionHijos';
            columnaEstados.textContent = automata.est_entrada[i];
            columnaAlfabeto.className='tablatransicionHijos';
            columnaAlfabeto.textContent = automata.arr_alfabeto[j];
            columnaDestinos.className='tablatransicionHijos';
            columnaDestinos.textContent = automata.arr_estados[i].estado_to[j];
            //agrego los elementos a sus nodos padres
            filaDatos.appendChild(columnaEstados);
            filaDatos.appendChild(columnaAlfabeto);
            filaDatos.appendChild(columnaDestinos);
            tablaPadre.appendChild(filaDatos);
            }
        }
    }
    resultado.appendChild(tablaPadre);
}

/*-----Eliminar bloque de anlisis de los automatas-----*/
// const aceptar2 = document.querySelector('#aceptar2');
// aceptar2.addEventListener('click', uwu);

// function uwu (e){
//     e.preventDefault();
//     const instrucciones2 = document.querySelector('#instrucciones2').remove();
// }

var automata_union, automata_concatenacion, automata_interseccion;
/*-----Primer analisis-----*/
const resultado1 = document.querySelector('#resultado1');
resultado1.addEventListener('click',pregunta1);
function pregunta1(){
    //equivalencia y simplificacion para el automata1
    const resumenEquivalente1 = document.querySelector('#resumenEquivalente1'),
        tablaEstadosEquivalente1 = document.querySelector('#tablaEstadosEquivalente1'),
        transicionEquivalente1 = document.querySelector('#transicionEquivalente1'),
        resumenSimplificado1 = document.querySelector('#resumenSimplificado1'),
        tablaEstadosSimplificado1 = document.querySelector('#tablaEstadosSimplificado1'),
        transicionSimplificado1 = document.querySelector('#transicionSimplificado1');
    //equivalencia y simplificacion para el automata2
    const resumenEquivalente2 = document.querySelector('#resumenEquivalente2'),
        tablaEstadosEquivalente2 = document.querySelector('#tablaEstadosEquivalente2'),
        transicionEquivalente2 = document.querySelector('#transicionEquivalente2'),
        resumenSimplificado2 = document.querySelector('#resumenSimplificado2'),
        tablaEstadosSimplificado2 = document.querySelector('#tablaEstadosSimplificado2'),
        transicionSimplificado2 = document.querySelector('#transicionSimplificado2');
    
    let simplificado1, simplificado2, equivalente1, equivalente2;
    //primer automata
    if(tipoAutomata.value == 'AFND'){
        //equivalencia primer automata
        let titulo1 = `<h4 class="text-center">Equivalencia 1<sup>er</sup> Autómata</h4><br><p>Dado que se ingresó un autómata de tipo '<strong>AFND</strong>', se procede a obtener su autómata equivalente:</p>`;
        resumenEquivalente1.innerHTML = titulo1;
        equivalente1 = Equivalente(AUTOMATA1);
        console.log('EQUIVALENTE1:',equivalente1);
        crearTablaDeEstados(equivalente1,tablaEstadosEquivalente1);
        crearTablaTransicionResultados(equivalente1,transicionEquivalente1);

        //simplificacion primer automata
        let titulo2 = `<h4 class="text-center">Simplificación 1<sup>er</sup> Autómata</h4><br><p>Ya obtenido el equivalente (AFD) del primer autómata, se procede a obtener su simplificación:</p>`
        resumenSimplificado1.innerHTML = `<br>` + titulo2;
        simplificado1 = Simplificar(equivalente1);
        console.log('SIMPLIFICADO1:',simplificado1);
        crearTablaDeEstados(simplificado1,tablaEstadosSimplificado1);
        crearTablaTransicionResultados(simplificado1,transicionSimplificado1);
    }else{ //si el primer automata es AFD
        let titulo1 = `<h4 class="text-center">Simplificación 1<sup>er</sup> Autómata</h4><br><p>Dado que se ingresó un autómata de tipo '<strong>AFD</strong>', se procede a obtener su simplificación:</p>`;
        resumenSimplificado1.innerHTML = titulo1;
        simplificado1 = Simplificar(AUTOMATA1);
        console.log('SIMPLIFICADO1:',simplificado1);
        crearTablaDeEstados(simplificado1,tablaEstadosSimplificado1);
        crearTablaTransicionResultados(simplificado1,transicionSimplificado1);
    }
    if(tipoAutomata2.value == 'AFND'){
        //equivalencia segundo automata
        let titulo1 = `<h4 class="text-center">Equivalencia 2<sup>do</sup> Autómata</h4><br><p>Dado que se ingresó un autómata de tipo '<strong>AFND</strong>', se procede a obtener su autómata equivalente:</p>`;
        resumenEquivalente2.innerHTML = titulo1;
        equivalente2 = Equivalente(AUTOMATA2);
        console.log('EQUIVALENTE2',equivalente2);
        crearTablaDeEstados(equivalente2,tablaEstadosEquivalente2);
        crearTablaTransicionResultados(equivalente2,transicionEquivalente2);

        //simplificacion segundo automata
        let titulo2 = `<h4 class="text-center">Simplificación 2<sup>do</sup> Autómata</h4><br><p>Ya obtenido el equivalente (AFD) del segundo autómata, se procede a obtener su simplificación:</p>`
        resumenSimplificado2.innerHTML = `<br>` + titulo2;
        simplificado2 = Simplificar(equivalente2);
        console.log('SIMPLIFICADO2:',simplificado2);
        crearTablaDeEstados(simplificado2,tablaEstadosSimplificado2);
        crearTablaTransicionResultados(simplificado2,transicionSimplificado2);
    }else{//si el segundo automata es AFD
        let titulo1 = `<h4 class="text-center">Simplificación 2<sup>do</sup> Autómata</h4><br><p>Dado que se ingresó un autómata de tipo '<strong>AFD</strong>', se procede a obtener su simplificación:</p>`
        resumenSimplificado2.innerHTML = titulo1;
        simplificado2 = Simplificar(AUTOMATA2);
        console.log('SIMPLIFICADO2:',simplificado2);
        crearTablaDeEstados(simplificado2,tablaEstadosSimplificado2);
        crearTablaTransicionResultados(simplificado2,transicionSimplificado2);
    }
    resultado1.disabled=true;
}

/*-----Segundo analisis-----*/
const resultado2 = document.querySelector('#resultado2');
resultado2.addEventListener('click',pregunta2);
function pregunta2(){
    // const para el primer automata
    const resumenAutomatas1 = document.querySelector('#resumenAutomatas1'),
        transicionComplemento1 = document.querySelector('#transicionComplemento1'),
        tablaEstadosComplemento1 = document.querySelector('#tablaEstadosComplemento1'),
        resEquivalencia1 = document.querySelector('#resEquivalencia1'),
        EstadosEquivalente1 = document.querySelector('#EstadosEquivalente1'),
        transEquivalente1 = document.querySelector('#transEquivalente1');
    // const para el segundo automata
    const resumenAutomatas2 = document.querySelector('#resumenAutomatas2'),
        transicionComplemento2 = document.querySelector('#transicionComplemento2'),
        tablaEstadosComplemento2 = document.querySelector('#tablaEstadosComplemento2'),
        resEquivalencia2 = document.querySelector('#resEquivalencia2'),
        EstadosEquivalente2 = document.querySelector('#EstadosEquivalente2'),
        transEquivalente2 = document.querySelector('#transEquivalente2');
    // const para union, concatenacion e interseccion
    const resumenUnion = document.querySelector('#resumenUnion'),
        tablaEstadosUnion = document.querySelector('#tablaEstadosUnion'),
        transicionUnion = document.querySelector('#transicionUnion'),
        resumenConcatenacion = document.querySelector('#resumenConcatenacion'),
        tablaEstadosConcatenacion = document.querySelector('#tablaEstadosConcatenacion'),
        transicionConcatenacion = document.querySelector('#transicionConcatenacion'),
        resumenInterseccion = document.querySelector('#resumenInterseccion'),
        tablaEstadosInterseccion = document.querySelector('#tablaEstadosInterseccion'),
        transicionInterseccion = document.querySelector('#transicionInterseccion'); 

    let equivalente1, equivalente2, complemento1, complemento2, union, concatenacion, interseccion;

    if(tipoAutomata.value == 'AFD' && tipoAutomata2.value == 'AFD'){  
        let descripcion = `<p>Dado que ambos autómatas ingresados son '<strong>${tipoAutomata2.value}</strong>', se procede a obtener un autómata a partir del complemento, unión, concatenación e intersección entre ambos autómatas ingresados.</p>`;

        //primer automata AFD complemento
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento1 = complemento(AUTOMATA1);
        resumenAutomatas1.innerHTML = descripcion +`<br>`+ titulo;
        crearTablaDeEstados(complemento1,tablaEstadosComplemento1);
        crearTablaTransicionResultados(complemento1,transicionComplemento1);

        //segundo automata AFD complemento
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento2 = complemento(AUTOMATA2);
        resumenAutomatas2.innerHTML =`<br>`+ titulo2;
        crearTablaDeEstados(complemento2,tablaEstadosComplemento2);
        crearTablaTransicionResultados(complemento2,transicionComplemento2);

        // Union entre Automata1 y automata2
        let tituloUnion = `<h4 class="text-center">Union</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la union de ambos:</p>`;
        union = Union(AUTOMATA1,AUTOMATA2);
        automata_union = union;
        console.log('UNION:',union);
        resumenUnion.innerHTML= `<br>` + tituloUnion;
        crearTablaDeEstados(union,tablaEstadosUnion);
        crearTablaTransicionResultados(union,transicionUnion);

        //concatenacion entre AUTOMATA1 y AUTOMATA2
        let tituloConcatenacion = `<h4 class="text-center">Concatenación</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la concatenación de ambos:</p>`;
        concatenacion = Concatenacion(AUTOMATA1,AUTOMATA2);
        automata_concatenacion = concatenacion;
        console.log('CONCATENACION:',concatenacion);
        resumenConcatenacion.innerHTML = `<br>` + tituloConcatenacion;
        crearTablaDeEstados(concatenacion,tablaEstadosConcatenacion);
        crearTablaTransicionResultados(concatenacion,transicionConcatenacion);

        //Interseccion entre AUTOMATA1 y AUTOMATA2
        let tituloInterseccion = `<h4 class="text-center">Intersección</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la intersección de ambos:</p>`;
        interseccion = Interseccion(AUTOMATA1,AUTOMATA2);
        automata_interseccion = interseccion;
        console.log('INTERSECCION:', interseccion);
        resumenInterseccion.innerHTML = `<br>` + tituloInterseccion;
        crearTablaDeEstados(interseccion,tablaEstadosInterseccion);
        crearTablaTransicionResultados(interseccion,transicionInterseccion);
    }
    if(tipoAutomata.value == 'AFND' && tipoAutomata2.value == 'AFND'){
        let descripcion = `<p>Dado que ambos autómatas ingresados son '<strong>${tipoAutomata2.value}</strong>', se debe proceder a tranformar ambos autómatas a su <strong>AFD</strong> equivalente</p>`;
        //primer automata AFND a AFD
        let tituloAFND = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        resEquivalencia1.innerHTML = descripcion + `<br>` + tituloAFND;
        equivalente1 = Equivalente(AUTOMATA1);
        crearTablaDeEstados(equivalente1,EstadosEquivalente1);
        crearTablaTransicionResultados(equivalente1,transEquivalente1);

        //segundo automata AFND a AFD
        let titulo2AFND = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        resEquivalencia2.innerHTML = titulo2AFND;
        equivalente2 = Equivalente(AUTOMATA2);
        crearTablaDeEstados(equivalente2,EstadosEquivalente2);
        crearTablaTransicionResultados(equivalente2,transEquivalente2);

        //primer automata AFD complemento
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento1 = complemento(equivalente1);
        resumenAutomatas1.innerHTML = descripcion +`<br>`+ titulo;
        crearTablaDeEstados(complemento1,tablaEstadosComplemento1);
        crearTablaTransicionResultados(complemento1,transicionComplemento1);

        //segundo automata AFD complemento
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento2 = complemento(equivalente2);
        resumenAutomatas2.innerHTML =`<br>`+ titulo2;
        crearTablaDeEstados(complemento2,tablaEstadosComplemento2);
        crearTablaTransicionResultados(complemento2,transicionComplemento2);

        // Union entre Automata1 y automata2
        let tituloUnion = `<h4 class="text-center">Union</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la union de ambos:</p>`;
        union = Union(equivalente1,equivalente2);
        automata_union = union;
        console.log('UNION:',union);
        resumenUnion.innerHTML= `<br>` + tituloUnion;
        crearTablaDeEstados(union,tablaEstadosUnion);
        crearTablaTransicionResultados(union,transicionUnion);

        //concatenacion entre AUTOMATA1 y AUTOMATA2
        let tituloConcatenacion = `<h4 class="text-center">Concatenación</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la concatenación de ambos:</p>`;
        concatenacion = Concatenacion(equivalente1,equivalente2);
        automata_concatenacion = concatenacion;
        console.log('CONCATENACION:',concatenacion);
        resumenConcatenacion.innerHTML = `<br>` + tituloConcatenacion;
        crearTablaDeEstados(concatenacion,tablaEstadosConcatenacion);
        crearTablaTransicionResultados(concatenacion,transicionConcatenacion);

        //Interseccion entre AUTOMATA1 y AUTOMATA2
        let tituloInterseccion = `<h4 class="text-center">Intersección</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la intersección de ambos:</p>`;
        interseccion = Interseccion(equivalente1,equivalente2);
        automata_interseccion = interseccion;
        console.log('INTERSECCION:', interseccion);
        resumenInterseccion.innerHTML = `<br>` + tituloInterseccion;
        crearTablaDeEstados(interseccion,tablaEstadosInterseccion);
        crearTablaTransicionResultados(interseccion,transicionInterseccion);
    }
    if(tipoAutomata.value == 'AFND' && tipoAutomata2.value == 'AFD'){
        let descripcion = `<p>Dado que el 1<sup>er</sup> Autómata es de tipo '<strong>${tipoAutomata.value}</strong>', se debe obtener su '<strong>AFD</strong>' equivalente:</p>`;
        
        //primer automata AFND a AFD
        let tituloAFND = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        resEquivalencia1.innerHTML = descripcion + `<br>` + tituloAFND;
        equivalente1 = Equivalente(AUTOMATA1);
        crearTablaDeEstados(equivalente1,EstadosEquivalente1);
        crearTablaTransicionResultados(equivalente1,transEquivalente1);

        //primer automata AFD complemento
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento1 = complemento(equivalente1);
        resumenAutomatas1.innerHTML = descripcion +`<br>`+ titulo;
        crearTablaDeEstados(complemento1,tablaEstadosComplemento1);
        crearTablaTransicionResultados(complemento1,transicionComplemento1);

        //segundo automata AFD complemento
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento2 = complemento(AUTOMATA2);
        resumenAutomatas2.innerHTML =`<br>`+ titulo2;
        crearTablaDeEstados(complemento2,tablaEstadosComplemento2);
        crearTablaTransicionResultados(complemento2,transicionComplemento2);

        // Union entre Automata1 y automata2
        let tituloUnion = `<h4 class="text-center">Union</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la union de ambos:</p>`;
        union = Union(equivalente1,AUTOMATA2);
        automata_union = union;
        console.log('UNION:',union);
        resumenUnion.innerHTML= `<br>` + tituloUnion;
        crearTablaDeEstados(union,tablaEstadosUnion);
        crearTablaTransicionResultados(union,transicionUnion);

        //concatenacion entre AUTOMATA1 y AUTOMATA2
        let tituloConcatenacion = `<h4 class="text-center">Concatenación</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la concatenación de ambos:</p>`;
        concatenacion = Concatenacion(equivalente1,AUTOMATA2);
        automata_concatenacion = concatenacion;
        console.log('CONCATENACION:',concatenacion);
        resumenConcatenacion.innerHTML = `<br>` + tituloConcatenacion;
        crearTablaDeEstados(concatenacion,tablaEstadosConcatenacion);
        crearTablaTransicionResultados(concatenacion,transicionConcatenacion);

        //Interseccion entre AUTOMATA1 y AUTOMATA2
        let tituloInterseccion = `<h4 class="text-center">Intersección</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la intersección de ambos:</p>`;
        interseccion = Interseccion(equivalente1,AUTOMATA2);
        automata_interseccion = interseccion;
        console.log('INTERSECCION:', interseccion);
        resumenInterseccion.innerHTML = `<br>` + tituloInterseccion;
        crearTablaDeEstados(interseccion,tablaEstadosInterseccion);
        crearTablaTransicionResultados(interseccion,transicionInterseccion);

    }
    if(tipoAutomata.value == 'AFD' && tipoAutomata2.value == 'AFND'){
        let descripcion = `<p>Dado que el 2<sup>do</sup> Autómata es de tipo '<strong>${tipoAutomata2.value}</strong>', se debe obtener su '<strong>AFD</strong>' equivalente:</p>`;

        //segundo automata AFND a AFD
        let titulo2AFND = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenemos el <strong>AFD</strong> equivalente:</p>`;
        resEquivalencia2.innerHTML = titulo2AFND;
        equivalente2 = Equivalente(AUTOMATA2);
        crearTablaDeEstados(equivalente2,EstadosEquivalente2);
        crearTablaTransicionResultados(equivalente2,transEquivalente2);

        //primer automata AFD complemento
        let titulo = `<h4 class="text-center">1<sup>er</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento1 = complemento(AUTOMATA1);
        resumenAutomatas1.innerHTML = descripcion +`<br>`+ titulo;
        crearTablaDeEstados(complemento1,tablaEstadosComplemento1);
        crearTablaTransicionResultados(complemento1,transicionComplemento1);

        //segundo automata AFD complemento
        let titulo2 = `<h4 class="text-center">2<sup>do</sup> Autómata</h4><br><p>Obtenermos el complemento :</p>`;
        complemento2 = complemento(equivalente2);
        resumenAutomatas2.innerHTML =`<br>`+ titulo2;
        crearTablaDeEstados(complemento2,tablaEstadosComplemento2);
        crearTablaTransicionResultados(complemento2,transicionComplemento2);

        // Union entre Automata1 y automata2
        let tituloUnion = `<h4 class="text-center">Union</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la union de ambos:</p>`;
        union = Union(AUTOMATA1,equivalente2);
        automata_union = union;
        console.log('UNION:',union);
        resumenUnion.innerHTML= `<br>` + tituloUnion;
        crearTablaDeEstados(union,tablaEstadosUnion);
        crearTablaTransicionResultados(union,transicionUnion);

        //concatenacion entre AUTOMATA1 y AUTOMATA2
        let tituloConcatenacion = `<h4 class="text-center">Concatenación</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la concatenación de ambos:</p>`;
        concatenacion = Concatenacion(AUTOMATA1,equivalente2);
        automata_concatenacion = concatenacion;
        console.log('CONCATENACION:',concatenacion);
        resumenConcatenacion.innerHTML = `<br>` + tituloConcatenacion;
        crearTablaDeEstados(concatenacion,tablaEstadosConcatenacion);
        crearTablaTransicionResultados(concatenacion,transicionConcatenacion);

        //Interseccion entre AUTOMATA1 y AUTOMATA2
        let tituloInterseccion = `<h4 class="text-center">Intersección</h4><br><p>A partir de los 2 autómatas AFD, se obtiene la intersección de ambos:</p>`;
        interseccion = Interseccion(AUTOMATA1,equivalente2);
        automata_interseccion = interseccion;
        console.log('INTERSECCION:', interseccion);
        resumenInterseccion.innerHTML = `<br>` + tituloInterseccion;
        crearTablaDeEstados(interseccion,tablaEstadosInterseccion);
        crearTablaTransicionResultados(interseccion,transicionInterseccion);
    }
    resultado2.disabled=true;
}

/*-----Tercer analisis-----*/
const resultado3 = document.querySelector('#resultado3');
resultado3.addEventListener('click',pregunta3);
function pregunta3(){
    //union
    const unionAFD = document.querySelector('#unionAFD'),
        tablaEstadosUnionAFD = document.querySelector('#tablaEstadosUnionAFD'),
        transicionUnionAFD = document.querySelector('#transicionUnionAFD'),
        unionAFDSimplificado = document.querySelector('#unionAFDSimplificado'),
        tablaEstadosUnionAFDSimplificado = document.querySelector('#tablaEstadosUnionAFDSimplificado'),
        transicionUnionAFDSimplificado = document.querySelector('#transicionUnionAFDSimplificado');
    //concatenacion
    const ConcaAFD = document.querySelector('#ConcaAFD'),
        tablaEstadosConcaAFD = document.querySelector('#tablaEstadosConcaAFD'),
        transicionConcaAFD = document.querySelector('#transicionConcaAFD'),
        ConcaSimplificado = document.querySelector('#ConcaSimplificado'),
        tablaEstadosConcaAFDSimplificado = document.querySelector('#tablaEstadosConcaAFDSimplificado'),
        transicionConcaAFDSimplificado = document.querySelector('#transicionConcaAFDSimplificado');
    //interseccion
    const InterseccionAFD = document.querySelector('#InterseccionAFD'),
        tablaEstadosInterseccionAFD = document.querySelector('#tablaEstadosInterseccionAFD'),
        transicionInterseccionAFD = document.querySelector('#transicionInterseccionAFD'),
        InterSimplificado = document.querySelector('#InterSimplificado'),
        tablaEstadosInterAFDSimplificado = document.querySelector('#tablaEstadosInterAFDSimplificado'),
        transicionInterAFDSimplificado = document.querySelector('#transicionInterAFDSimplificado');

    let UnionAFD, simplificarUnion,  concatenacionAFD, SimplificarConca, InterAFD, InterSimp;
    
    //PASAR LA UNION(AFND) A AFD
    let tituloUnionAFD = `<h4 class="text-center">Union a AFD</h4><br><p>Obtenermos el autómata de la Union del punto anterior y lo convertiremos a AFD:</p>`;
    UnionAFD = Equivalente(automata_union);
    console.log('UNION A AFD:', UnionAFD);
    unionAFD.innerHTML = tituloUnionAFD;
    crearTablaDeEstados(UnionAFD,tablaEstadosUnionAFD);
    crearTablaTransicionResultados(UnionAFD,transicionUnionAFD);
    

    //SIMPLIFICAR UNION(AFD)
    let SimplificarUnionAFD = `<h4 class="text-center">Simplificar Union(AFD)</h4><br><p>Procedemos a simplificar el autómata de la union(AFD):</p>`;
    simplificarUnion = Simplificar(UnionAFD);
    console.log('UNION SIMPLIFICADO:', simplificarUnion);
    unionAFDSimplificado.innerHTML = `<br>` + SimplificarUnionAFD;
    crearTablaDeEstados(simplificarUnion,tablaEstadosUnionAFDSimplificado);
    crearTablaTransicionResultados(simplificarUnion,transicionUnionAFDSimplificado);

    //PASAR LA CONCATENACION(AFND) A AFD
    let tituloConcaAFD = `<h4 class="text-center">Concatenación a AFD</h4><br><p>Obtenermos el autómata de la Concatenación del punto anterior y lo convertiremos a AFD:</p>`;
    concatenacionAFD = Equivalente(automata_concatenacion);
    console.log('CONCATENACION A AFD:', concatenacionAFD);
    ConcaAFD.innerHTML = tituloConcaAFD;
    crearTablaDeEstados(concatenacionAFD,tablaEstadosConcaAFD);
    crearTablaTransicionResultados(concatenacionAFD,transicionConcaAFD);
    //SIMPLIFICAR CONCATENACION(AFD)
    let SimplificarConcaAFD = `<h4 class="text-center">Simplificar concatenación(AFD)</h4><br><p>Procedemos a simplificar el autómata de la concatenación(AFD):</p>`;
    SimplificarConca = Simplificar(concatenacionAFD);
    console.log('CONCATENACION SIMPLIFICADO:', SimplificarConca);
    ConcaSimplificado.innerHTML = `<br>` + SimplificarConcaAFD;
    crearTablaDeEstados(SimplificarConca,tablaEstadosConcaAFDSimplificado);
    crearTablaTransicionResultados(SimplificarConca,transicionConcaAFDSimplificado);

    //PASAR LA INTERSECCION(AFND) A AFD
    let tituloInterAFD = `<h4 class="text-center">Intersección a AFD</h4><br><p>Obtenermos el autómata de la Intersección del punto anterior y lo convertiremos a AFD:</p>`;
    InterAFD = Equivalente(automata_interseccion);
    console.log('INTERSECCION A AFD:', InterAFD);
    InterseccionAFD.innerHTML = tituloInterAFD;
    crearTablaDeEstados(InterAFD,tablaEstadosInterseccionAFD);
    crearTablaTransicionResultados(InterAFD,transicionInterseccionAFD);
    //SIMPLIFICAR INTERSECCION(AFD)
    let SimplificarInterAFD = `<h4 class="text-center">Simplificar Intersección(AFD)</h4><br><p>Procedemos a simplificar el autómata de la intersección(AFD):</p>`;
    InterSimp = Simplificar(InterAFD);
    console.log('INTERSECCION SIMPLIFICADO:', InterSimp);
    InterSimplificado.innerHTML = `<br>` + SimplificarInterAFD;
    crearTablaDeEstados(InterSimp,tablaEstadosInterAFDSimplificado);
    crearTablaTransicionResultados(InterSimp,transicionInterAFDSimplificado);
    resultado3.disabled = true;
}

/*-------------------Equivalencia    ------------------*/
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
function TablaEquivalencia(Transiciones, ClausurasEpsilon, EstadoInicialAutomata,tablaClausuraEpsilon){
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
                if(Array.isArray(EstadoActual[j])){
                    let auxiliar = EstadoActual[j];
                    for(let z = 0; z<auxiliar.length;z++){
                        PosActual = Transiciones[0].indexOf(auxiliar[z]);
                        for(let k=0; k<ClausurasEpsilon[PosActual].length; k++){
                            index = Transiciones[0].indexOf(ClausurasEpsilon[PosActual][k]);
                            if((Transiciones[i+2][index] != null) && (!BuscarEstado(Transiciones[i+2][index],Alcances))){
                                Alcances.push(Transiciones[i+2][index]);}}}}
                else{
                PosActual = Transiciones[0].indexOf(EstadoActual[j]);
                for(let k=0; k<ClausurasEpsilon[PosActual].length; k++){
                    index = Transiciones[0].indexOf(ClausurasEpsilon[PosActual][k]);
                    let auxiliar = Transiciones[i+2][index];
                        if(Array.isArray(Transiciones[i+2][index])){
                            for (let z = 0; z<auxiliar.length; z++){
                                if((auxiliar != null) && (!BuscarEstado(auxiliar[z],Alcances))){
                                    Alcances.push(auxiliar[z]);}}}
                        else
                            if((auxiliar != null) && (!BuscarEstado(auxiliar,Alcances))){
                                Alcances.push(auxiliar)}
                    
                }}
            }                
            for (let j=0; j<Alcances.length;j++){ // se agregan los alcances epsilon -> alfabeto -> epsilon
                if(Array.isArray(Alcances[j])){
                    let auxil = Alcances[j]
                    for(let z=0; z<auxil;z++){
                        PosActual = Transiciones[0].indexOf(auxil[z]);
                        for(let k=0; k<ClausurasEpsilon[PosActual].length; k++){ // ClausurasEpsilon[PosActual][k]
                            if( (ClausurasEpsilon[PosActual][k]!=null) && (!BuscarEstado(ClausurasEpsilon[PosActual][k],Alcances))){
                                Alcances.push(ClausurasEpsilon[PosActual][k]);
                            }  
                        }}}
                else
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
function Tabla_Transición(estado2,entrada2,alfabeto2){
    let Tabla = new Array(alfabeto2.length+2);
    let k = 0;
    Tabla[0] = [estado2[0].nombre];
    //Tabla[1] = [estado2[0].epsilon];
    for (var i=1; i < entrada2.length; i++){
        Tabla[0].push(estado2[i].nombre);
       // Tabla[1].push(estado2[i].epsilon);
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
    }return false
}
function ClausuraEpsilon(EstadosEntrada, Estadosinfo, Estado){  
    let EpsilonFinal = false;
    let EpsilonCaminos = [];
    let recorrerEpsilon = 0;
    let InfoEstadoActual=Estadosinfo[EstadosEntrada.indexOf(Estado)];
    //console.log(InfoEstadoActual)
    let PosActual=EstadosEntrada.indexOf(Estado)
    //console.log(PosActual)
    if(InfoEstadoActual.epsilon[0]==null){
        EpsilonCaminos[0]=null;
        return EpsilonCaminos;
    }
    //console.log(Estadosinfo[PosActual].epsilon[0])
    while(!EpsilonFinal){
        if(Estadosinfo[PosActual].epsilon[0] !== null){
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
function Equivalente(AUTOMATA){
    var tablaTransiciones, tablaClausuraEpsilon = [];
    for (let i = 0; i < AUTOMATA.est_entrada.length; i++){
        tablaClausuraEpsilon.push(ClausuraEpsilon( AUTOMATA.est_entrada, AUTOMATA.arr_estados, AUTOMATA.est_entrada[i]));
    }
    tablaTransiciones = Tabla_Transición(AUTOMATA.arr_estados, AUTOMATA.est_entrada,AUTOMATA.arr_alfabeto)

    var EpsilonCaminos = [], Tabla = [], TablaTransicion = [], Tabla_Equivalencia = [], AFD;
    //EpsilonCaminos = ClausuraEpsilon(AUTOMATA.est_entrada, AUTOMATA.arr_estados, AUTOMATA.est_entrada[0])
    Tabla = Tabla_Epsilon(AUTOMATA.arr_estados,AUTOMATA.est_entrada)
    TablaTransicion = Tabla_Transición(AUTOMATA.arr_estados,AUTOMATA.est_entrada,AUTOMATA.arr_alfabeto)
    Tabla_Equivalencia = TablaEquivalencia(tablaTransiciones, tablaClausuraEpsilon, AUTOMATA.est_inicial,tablaClausuraEpsilon)
    console.log(Tabla_Equivalencia)
    AFD = Etiquetado(AUTOMATA,Tabla_Equivalencia,AUTOMATA.arr_alfabeto,Tabla)
    return AFD;
}

/*-----------Crear AFD NUEVO----------------*/
function Separar(TablaEquivalencia, Alfabeto, Aux1, Aux2){
    var Aux3 = []
    for(let i=0; i < TablaEquivalencia.length; i++){
        for(let j=0; j < Alfabeto.length+1; j++){
            if(j === 0){
                Aux1.push(TablaEquivalencia[i][j])

           }
           else{
                Aux3.push(TablaEquivalencia[i][j])
           }
        }
        Aux2.push(Aux3)
        Aux3 = []
    }
}
function Comparar(Array1,Array2){ //se podia hacer con indexOf pero js no siempre iguala bien los arrays uwu
    var Cont = 0
    if(Array1.length === Array2.length){
        for(let i=0; i < Array1.length; i++){
            if(Array1[i] === Array2[i]){
                Cont++
            }
            else{
                return false
            }
        }
        if(Cont === Array1.length){
            return true
        }
    }
    else{
        return false
    }
}
function Renombrar2(Estados,Arr_Estados,Aux1){
    var Asc = 65
    for(let i=0; i < Estados.length; i++){
        Aux1.push(String.fromCharCode(Asc+i))
    }
    var Aux3= [], Aux_Transiciones = []
    for(let j=0; j <Arr_Estados.length; j++){
        for(let k=0; k <Arr_Estados[j].length; k++){
            for(let m=0; m <Estados.length; m++){
                var Bool = Comparar(Arr_Estados[j][k],Estados[m])
                if(Bool === true){
                    Aux3.push(Aux1[m])
                }
            }
        }
        Aux_Transiciones.push(Aux3)
        Aux3 = []
    }
    return Aux_Transiciones
}
function Finales(A, Estados,E){
    var final = []
    for(let i=0; i < E.length; i++){
        for(let j=0; j < E[i].length; j++){
            for(let k=0; k < (A.est_finales).length; k++){
                if(E[i][j] === (A.est_finales)[k]){
                    final.push(Estados[i])
                    break;
                }
            }
        }
    }
    return final
}
function Crear_Afd(A, Estados, Transiciones, E,Tabla, TablaEquivalencia){
    //Inicial
    var Inicial , Indice, InicialF
    Inicial = TablaEquivalencia[0][0]
    console.log(Inicial)
    for(let j=0; j < E.length; j++){
        var Bool
        Bool = Comparar(Inicial,E[j])
        if(Bool === true){
            InicialF = Estados[j]
        }
    }
    //Finales
    var Final = Finales(A,Estados,E)
   //Arr_Estados
    var Arr_estados = []
    for(let x=0; x < Estados.length; x++){
        var nombre, final, estado_to
        nombre = Estados[x]
        //final
        if(Final.indexOf(nombre)>= 0){
            final = true
        }
        else{
            final = false
        }
        //estado_to
        estado_to = Transiciones[x]
        Arr_estados.push(new Estado(nombre,final,estado_to))
    }
    var AFD = new Quintupla(Estados,A.arr_alfabeto,InicialF,Final,Arr_estados)
    return AFD
}
function Etiquetado(A,TablaEquivalencia, Alfabeto,Tabla){
    var Estados = [], Arr_Estados= [], Transiciones = [], Estados_Renombrados = [], AFD
    Separar(TablaEquivalencia, Alfabeto, Estados, Arr_Estados)
    Transiciones = Renombrar2(Estados,Arr_Estados,Estados_Renombrados)

    AFD = Crear_Afd(A,Estados_Renombrados,Transiciones, Estados, Tabla, TablaEquivalencia)
    return AFD;
}
/*-----------Simplificacion-----------------*/
/*Funcion para simplificar un automata*/ 
function Arr_estados(Matriz1, Matriz2,Indice,A){ //
    for (let i=0;i<Indice-1;i++){
        Matriz1[i]=A[i]
    }

    for (let j=1;j<Indice;j++){
        Matriz2[j-1]=A[j]
    }
}
function indexEstado(Nombre,A){
    for (let i=0;i<(A.arr_estados).length;i++){
        if((A.arr_estados)[i].nombre === Nombre){
            return i;
        }
    }
}
function semiMatriz(AUTOMATA,Matriz,Estado1,Estado2){
    var Indice = (AUTOMATA.est_entrada).length
    var Matriz_Aux = [], Aux = 1, E1, E2

    for (let i=0;i<Indice-1;i++){
        for (let j=0;j<Aux && Aux<Indice ;j++){ //columna, creo?
            E1=indexEstado(Estado1[i],AUTOMATA), E2=indexEstado(Estado2[j],AUTOMATA) 
            if(((AUTOMATA.arr_estados)[E1]).final !== (((AUTOMATA.arr_estados)[E2]).final)){
                Matriz_Aux[j]="x";
           }
           else{
                var F1,F2, K1,K2, Cont = 0

                for(let k=0;k<(AUTOMATA.arr_alfabeto).length;k++){
                    F1=(((AUTOMATA.arr_estados)[E1]).estado_to)[k], F2=(((AUTOMATA.arr_estados)[E2]).estado_to)[k] //f1,f2 estados_to de e1 y e2 
                    if(F1==null || F2==null){
                        Matriz_Aux[j]="x";
                    }
                    else{
                        K1=indexEstado(F1,AUTOMATA), K2=indexEstado(F2,AUTOMATA)
                        if(((AUTOMATA.arr_estados)[K1]).final === true && ((AUTOMATA.arr_estados)[K2]).final=== true || ((AUTOMATA.arr_estados)[K1]).final === false && ((AUTOMATA.arr_estados)[K2]).final=== false){
                            Cont++;
                        }
                    }
                }
                if(Cont === (AUTOMATA.arr_alfabeto).length ){
                    Matriz_Aux[j]= [Estado1[i],Estado2[j]];
                }
                else{
                    Matriz_Aux[j]="x"
                }
           }
        }
        Matriz.push(Matriz_Aux)
        Matriz_Aux = []
        Aux++;   
    }
}
function Transiciones(A, Estados, Bool){
    console.log(Estados)
    var Arr_Estados = []
    let i
    if(Bool == false){
        i=1
        for(let j=0;j<(A.arr_estados).length;j++){
            if(Estados[0] === ((A.arr_estados)[j]).nombre){
                Arr_Estados.push((A.arr_estados)[j])
            }
        }
    }
    else{
        i=0
    }
    //
    
    for(i;i<Estados.length;i++){
        for(let j=0;j<(A.arr_estados).length;j++){
            if(Estados[i][0] === ((A.arr_estados)[j]).nombre){
                var aux_estado = (A.arr_estados)[j]
                aux_estado.nombre=Estados[i]
                Arr_Estados.push(aux_estado)
            }
        }
    }
    return Arr_Estados
}
function ESimplificado(Simplificado,Estados, Matriz){
    var Aux = 1
    for(let i=0;i<Matriz.length;i++){

        for(let j=0;j<Aux && Aux<Matriz.length+1 ;j++){

            for(let k=0;k<Matriz[i][j].length;k++){
                if((Matriz[i][j])[k] != "x"){  
                    Simplificado = false
                    if(k==0){
                        Estados.push(Matriz[i][j]);
                    }  
                }
            }
        }
        Aux++;
    }
    return Simplificado
}
function ASimplificado(A,Matriz){
    var simplificado, Nuevos_Estados = [], AFDSimplificado
    simplificado=ESimplificado(true,Nuevos_Estados,Matriz)
    
    /*------ Quintupla automata simplificado------*/
    if(simplificado === true){
        return A
    }
    else{
        var Inicial = [], Alfabeto = [], Estados = [], Existe = false, Finales = [], transiciones = []
        //INICIAL
        for(let i=0;i<Nuevos_Estados.length;i++){
            for(let j=0;j<Nuevos_Estados[i].length;j++){
                if(A.est_inicial[0] === Nuevos_Estados[i][j]){
                    Inicial.push(Nuevos_Estados[i])
                    Existe=true //no esta dentro de Estados
                }
            }
        }
        console.log(Nuevos_Estados)
        //ALFABETO
        Alfabeto = A.arr_alfabeto
        //ESTADOS
        if(Existe===false){
            Estados.push(A.est_inicial[0])
            Inicial.push(A.est_inicial[0])
        }
        for(let i=0;i<Nuevos_Estados.length;i++){
            Estados.push(Nuevos_Estados[i])
        }

        let k;
        if(Existe===false){
            k=1
        } 
        else{
            k=0
        }
        for(k ;k<Estados.length;k++){
            var b=(Estados[k]).length
            for(let l=0;l<(A.est_finales).length;l++){
                if(Estados[k][b-2]===A.est_finales[l] || Estados[k][b-2]===A.est_finales[l] ){
                    Finales.push(Estados[k])
                }   
            }   
        }
    }
    console.log(Estados,Existe)
    transiciones = Transiciones(A,Estados,Existe)
    var AFDSimplificado = new Quintupla(Estados,Alfabeto,Inicial,Finales,transiciones)
    return AFDSimplificado
}
function RenombrarSim(A, Estados){
    var ARenom, Asc = 65, Aux1 = [],Estados_renom = [], Estados_finales = [], Aux = []
    for(let i=0; i < Estados.length; i++){
        Aux1.push(Estados[i].nombre)
        Estados_renom.push(String.fromCharCode(Asc+i))
    }


    console.log(Aux1,Estados_renom)
    for(let j=0; j < A.arr_estados.length; j++){ //para crear los estados nuevos 
        for(let k=0; k < (A.arr_estados)[j].estado_to.length; k++){
            for(let h=0; h < Aux1.length; h++){
                var indice = Aux1[h].indexOf((A.arr_estados)[j].estado_to[k])
                if(indice>=0){
                    Aux.push(Estados_renom[h])

                }
            }
        }
        var x = new Estado(Estados_renom[j],A.arr_estados[j].final,Aux)
        Estados_finales.push(x)
        Aux = []
    }
    //INICIAL
    var indice_inicial
    for(let y=0; y < Aux1.length; y++){
        if(Comparar(Aux1[y],A.est_inicial[0]) === true){
            indice_inicial = y
        }
    } 
    //FINALES
    var Finales_renom = []
    for(let x=0; x < A.est_finales.length; x++){
        
        for(let h=0; h < Aux1.length; h++){
            console.log(A.est_finales[x],Aux1[h])
            if(Comparar(A.est_finales[x],Aux1[h]) === true){
                Finales_renom.push(Estados_renom[h])
            }
        }
    } 
    ARenom = new Quintupla(Estados_renom,(A.arr_alfabeto),(Estados_renom[indice_inicial]),Finales_renom,Estados_finales)
    return ARenom
}
function Simplificar(AUTOMATA){
    var Matriz = [], Estado1 = [], Estado2 = [], AFDSimp, AFDRenombrado;
    var Arr_Estados= AUTOMATA.est_entrada  //Todos los estados disponibles
    Arr_estados(Estado1,Estado2,Arr_Estados.length,Arr_Estados)
    semiMatriz(AUTOMATA,Matriz,Estado2,Estado1)
    console.log(Estado1,Estado2)
    AFDSimp = ASimplificado(AUTOMATA, Matriz)
    AFDRenombrado = RenombrarSim(AFDSimp,AFDSimp.arr_estados)
    console.log("AFD SIMPLIFICADO",AFDRenombrado)
    return AFDRenombrado;
}
//Simplificar(AUTOMATA)
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
    var Aux = new EstadoN(Nombre,Final,Estados_tof,[null])
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
    //Inicial
    Inicial = [String.fromCharCode(65)]
    //Entrada y arr_estados
    var Arr_Estados = [], Estados = []
    Estados = Renombrar(Automata1, Automata2, Alfabeto, Arr_Estados, Iniciales)
    Estados.unshift(Inicial[0])
    for(let i=0; i<Alfabeto.length; i++){
        EstadoInicial_to.push(null)
    }
    var EstadoInicial = new EstadoN(Inicial[0],false,EstadoInicial_to,Iniciales)
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
    return A1uA2
}
//PARA LLAMAR A LA FUNCION : UNION(AUTOMATA1,AUTOMATA2)
 //Interseccion
 function Interseccion(AUTOMATA1,AUTOMATA2){
    var A1C, A2C, union, AFDUnion, Interseccion
    A1C = complemento(AUTOMATA1)
    A2C = complemento(AUTOMATA2)
    union = Union(A1C,A2C)
    AFDUnion = Equivalente(union)
    Interseccion = complemento(AFDUnion)
    return Interseccion
 }
 //!para llamar interseccion: Interseccion(AUTOMATA1,AUTOMATA2) ::::::::::::...................

/*-------CONCATENACIÓN-------*/
function Concatenacion (auto1, auto2){
    /*-----Creación de variables-----*/
    var  estadosTotalesConcatenacion = [], alfabetoConcatenacion = [], estadoInicialConcatenacion = [];
    var  estadosFinalesConcatenacion = [], estadosDesdeHaciaConcatenacion = [];
    var a = JSON.parse(JSON.stringify(auto1));
    var b = JSON.parse(JSON.stringify(auto2));
    var estaditosA = JSON.parse(JSON.stringify(auto1.arr_estados));
    var estaditosB = JSON.parse(JSON.stringify(auto2.arr_estados));
    /*-----Operaciones varias-----*/
    estadoInicialConcatenacion = a.est_inicial; //Se asigna estado de entrada (inicial) al autómata concatenado.
    alfabetoConcatenacion = agruparAlfabeto(a.arr_alfabeto, b.arr_alfabeto, alfabetoConcatenacion);  //Se concatenan los alfabetos (sin repetir).
    estadosFinalesConcatenacion = b.est_finales;  //Se asignan los estados finales del autómata concatenado.
    estadosTotalesConcatenacion = agruparDatos(a.est_entrada, b.est_entrada, estadosTotalesConcatenacion);  //Se concatenan los estados de ambos autómatas.
    /*-----Corrección de estados-----*/
    var estCorregidoA = reparandoEstadosA(a.arr_estados, alfabetoConcatenacion, a, estaditosA, b.est_inicial);
    var estCorregidoB = reparandoEstadosB(b.arr_estados, alfabetoConcatenacion, b, estaditosB);
    /*-----Agrupación de estados-----*/
    estadosDesdeHaciaConcatenacion = agruparDatos(estCorregidoA, estCorregidoB, estadosDesdeHaciaConcatenacion);  //Agrupa todos los estados.
    /*-----Autómata concatenado-----*/
    var A1conA2 = new Quintupla(estadosTotalesConcatenacion, alfabetoConcatenacion, estadoInicialConcatenacion, estadosFinalesConcatenacion, estadosDesdeHaciaConcatenacion);

    console.log(A1conA2);  //Se muestra el autómata
    return A1conA2;  //Se retorna el autómata

    /*---AVISO: Falta cambiar nombre de estados en caso que los estados de ambos autómatas coincidan. Estoy en ello c: */
}

//Para llamar a la función: Concatenacion(AUTOMATA1, AUTOMATA2);

function reparandoEstadosA(estadosA, alfabetin, automataA, c, inicioB){
    var arrEstados = [];
    for (var j=0;j<estadosA.length;j++){
        var nombreEstado = estadosA[j].nombre;
        var boolEstado = estadosA[j].final;
        var estToEstado = [];
        for (var x=0;x<alfabetin.length;x++){
            estToEstado[x] = null;
        }
        for (var a=0;a<alfabetin.length;a++){
            for (var b=0;b<automataA.arr_alfabeto.length;b++){
                if (alfabetin[a] == automataA.arr_alfabeto[b]){
                    estToEstado[a] = c[j].estado_to[b];
                    break;
                }
            }

        }
        var epsilonEstado = [null, null];
        arrEstados[j] = new EstadoN(nombreEstado, boolEstado, estToEstado, epsilonEstado);
    }

    for (var n=0;n<arrEstados.length;n++){
        if(arrEstados[n].final == true){
            arrEstados[n].final = false;
            arrEstados[n].epsilon = [arrEstados[n].nombre, inicioB[0]];
        }
    }
    return arrEstados;
}

function reparandoEstadosB(estadosA, alfabetin, automataA, c){
    var arrEstados = [];
    for (var j=0;j<estadosA.length;j++){
        var nombreEstado = estadosA[j].nombre;
        var boolEstado = estadosA[j].final;
        var estToEstado = [];
        for (var x=0;x<alfabetin.length;x++){
            estToEstado[x] = null;
        }
        for (var a=0;a<alfabetin.length;a++){
            for (var b=0;b<automataA.arr_alfabeto.length;b++){
                if (alfabetin[a] == automataA.arr_alfabeto[b]){
                    estToEstado[a] = c[j].estado_to[b];
                    break;
                }
            }

        }
        var epsilonEstado = [null, null];
        arrEstados[j] = new EstadoN(nombreEstado, boolEstado, estToEstado, epsilonEstado);
    }
    return arrEstados;
}

function agruparDatos(datos1, datos2, a){
    return a = datos1.concat(datos2);
}

function agruparAlfabeto(alfabetoA, alfabetoB, final){
    var aux = [];
    for (var j=0;j<alfabetoB.length;j++){
        var cont = 0;
        for (var k=0;k<alfabetoA.length;k++){
            if (alfabetoB[j] == alfabetoA[k]){
                cont = cont + 1;
            }
        }
        if (cont == 0){
            aux.push(alfabetoB[j]);
        }
        cont = 0;
    }
    final = alfabetoA.concat(aux);
    return final;
}


