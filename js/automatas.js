/*Constructor*/
function Quintupla(est_Entrada,arr_alfabeto,est_Iniciales,est_Finales){
    this.est_Entrada = est_Entrada
    this.arr_alfabeto = arr_alfabeto
 //   this. = 
    this.est_Iniciales = est_Iniciales
    this.est_Finales = est_Finales
}

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
    quintupla1 = [est_Entrada1, arr_alfabeto1, est_Iniciales1, est_Finales1];
    enviar1.disabled = true;
    console.log(quintupla1);
    var afd = new Quintupla(est_Entrada1, arr_alfabeto1, est_Iniciales1, est_Finales1)
    console.log(afd)
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
 
    for(let j=0; j<(entrada1.length * alfabeto1.length) ; j++){
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





