const tablaTransicion = document.querySelector("#tablaTransicion");

const entrada = document.querySelector("#entrada");
const alfabeto = document.querySelector("#alfabeto");
const iniciales = document.querySelector("#estadosIniciales");
const finales = document.querySelector("#estadosFinales");

var transiciones = ['Entrada','Lectura','Destino'];
var quintupla = [];
var est_Entrada =[];
var arr_alfabeto = [];
var est_Iniciales = [];
var est_Finales = [];

const enviar = document.querySelector("#Enviar");

enviar.addEventListener('click',ordenarElementos);

function ordenarElementos(e){
    e.preventDefault();
    var a = entrada.value, b = alfabeto.value, c = iniciales.value, d = finales.value;
    est_Entrada = a.split(',');
    arr_alfabeto = b.split(',');
    est_Iniciales = c.split(',');
    est_Finales = d.split(',');
    quintupla = [est_Entrada, arr_alfabeto, est_Iniciales, est_Finales];
    enviar.disabled = true;
    console.log(quintupla);
    crearTablatransicion();
}

function crearTablatransicion(){
    // e.preventDefault();
    var tabla_padre = document.createElement('table');
    var fila = document.createElement('tr');
    for(let i=0; i<3 ; i++){
        var columna_p = document.createElement('td');
        columna_p.style.width="200px";
        columna_p.style.height="50px";
        columna_p.style.textAlign="center";
        columna_p.style.backgroundColor="#cfd8dc";
        columna_p.textContent = transiciones[i];
        fila.appendChild(columna_p);
    }
    tabla_padre.appendChild(fila);

    
    for(let j=0; j<(entrada.length * alfabeto.length) ; j++){
        var filas = document.createElement('tr');
        var columna_three = document.createElement('td');
        var input = document.createElement('input');
        for(let m=0; m<3; m++){
            var columna_one = document.createElement('td');
            var columna_two = document.createElement('td');
  
            columna_one.style.width="200px";
            columna_one.style.height="50px";
            columna_one.style.textAlign="center";
            columna_one.textContent = est_Entrada[m];

            columna_two.style.width="200px";
            columna_two.style.height="50px";
            columna_two.style.textAlign="center";
            if(alfabeto[m]!=undefined)
                columna_two.textContent = alfabeto[m];
            
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
    
    tablaTransicion.appendChild(tabla_padre);
}





