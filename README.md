# Trabajo Unidad II: Autómatas 

Implementación web diseñada para el análisis de autómatas AFD y AFND.

- Visite la web : [leoquark.github.io/Automatas/](https://leoquark.github.io/Automatas/)

___

## INSTRUCCIONES

### Formulario para el ingreso de los autómatas

*Estas instrucciones sirven para el ingreso de ambos automatas (1er y 2do autómata).*

1. Selecciona el tipo de Autómata:
    + AFD (Autómata Finito Determinista).

    + AFND (Autómata Finito No Determinista).

2. Ingresa los estados de entrada.
    + Estos deben estar separados por una coma (,).

    + ej: q0,q1,q2  o   a,b,c

3. Ingrese el alfabeto de entrada.
    + Estos deben estar separados por una coma (,).

4. Ingrese el estado inicial.
    + **AFD**: Solo debe ingresar un estado inicial, este debe pertenecer a los entados de entrada.

    + **AFND**: Puede ingresar mas de un estado inicial, separados por una coma (,).

5. Ingrese los estados finales.
    + Estos deben estar separados por una coma (,) y deben pertenecer a los estados de entrada.

6. Presione el botón de *"Ingresar Datos"*.

___

### Formulario para la Tabla de Transición.

Se crea una tabla con los datos de *Entrada*, *Lectura* y *Destino*:

7. Ingrese un estado de destino para la lectura del estado de entrada indicado.
    + **AFD**: Debe ingresar solo un estado de destino y este debe pertenecer a los estados de entrada. Además debe rellenar todos los campos.

    + **AFND**: Puede ingresar más de un estado de destino, los cuales deben estar separados por una coma (,). Estos deben pertenecer a los estados de entrada. Puede dejar campos vacios (se entienden como *lecturas nulas*).

8. Presione el botón de *"Ingresar Datos"*.

___

## Análisis de los Autómatas

El análisis se realizará mostrando 2 tablas, una *tabla de estados* (incial,final y conjunto de todos los estados) y una *tabla de transición*, respectivamente.

1. Obtener el(los) **AFD equivalentes**  y los **simplifica**.
    + En el caso de que se hayan ingresado autómatas de tipo *AFND*, primero se obtiene su AFD equivalente y luego se simplifica.

    + Si se ingresan autómatas de tipo *AFD*, se realiza inmediatamente su simplificación.

2. Complemento, unión, concatenación e intersección.
    + **Complemento**: En el caso de que se hayan ingresado autómatas de tipo *AFND*, se obtiene su AFD equivalente y se procede a obtener su complemento.

    + **Unión**: Se obtiene la unión de ambos autómatas *AFD* (si se ingresan autómatas *AFND*, se obtienen sus equivalente). En el caso de que los autómatas coincidan en sus estados de entrada, estos serán renombrados automáticamente.

    + **Concatenación**: Se obtiene la concatenación de ambos autómatas *AFD* (si se ingresan autómatas *AFND*, se obtienen sus equivalentes).

    + **Intersección**: Se obtiene la intersección de ambos autómatas *AFD* (si se ingresan autómatas *AFND*, se obtienen sus equivalentes).

3. Se obtiene el autómata equivalente (*AFD*) de los procedimientos del punto anterior (unión, concatenación e intersección). Luego de esto, se obtiene la simplificación de cada uno de estos.

