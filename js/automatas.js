const tablaTransicion = document.querySelector("#tablaTransicion");


const entrada = document.querySelector("#entrada").value;
const alfabeto = document.querySelector("#alfabeto").value;
const iniciales = document.querySelector("#estadosIniciales").value;
const finales = document.querySelector("#estadosFinales").value;


var est_Entrada = [];
var arr_alfabeto = [];
var est_Iniciales = [];
var est_Finales = [];

const enviar = document.querySelector("#Enviar");

enviar.addEventListener('click',Dividir);

function Dividir(e){
    e.preventDefault();
    est_Entrada = entrada.split(",");
    arr_alfabeto = alfabeto.split(',');
    est_Iniciales = iniciales.split(',');
    est_Finales = finales.split(',');
    var quintupla = [est_Entrada,arr_alfabeto,est_Iniciales,est_Finales];
    console.log(quintupla);
}


