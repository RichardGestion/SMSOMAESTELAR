//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Que es SMS?",
        op0:"enfoque sistemático para la gestión de la seguridad operacional.",
        op1:"cualquier ocurrencia, que no llegue a ser un accidente.",
        op2:"es un aspecto importante de la cultura.",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"¿Que es Seguridad Operacional?",
        op0:"Impacto real o potencial de un peligro.",
        op1:"Estado en el que los riesgos, se reducen y controlan a un nivel aceptable.",
        op2:"Condiciones existentes en el sistema SMS.",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"¿Qué es Peligro?",
        op0:"cualquier condición potencial que pueda ocasionar lesiones o muertes.",
        op1:"Es el proceso de incorporar defensas o controles preventivos. ",
        op2:"la probabilidad previstas para las consecuencias de un peligro.",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"¿Qué es Riesgos?",
        op0:"La probabilidad y severidad previstas para las consecuencias de un peligro.",
        op1:"Impacto real de un peligro que se puede expresar de forma cualitativa.",
        op2:"Cualquier condición existente que pueda ocasionar lesiones, enfermedad.",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿Qué es Incidente?",
        op0:"Un evento puede producir más de una consecuencia.",
        op1:"Conjunto de consecuencias fatales.",
        op2:"Cualquier ocurrencia, que no llegue a ser un accidente.",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"¿Qué es Condiciones Latentes?",
        op0:"Conjunto de acontecimientos negativos que pueden permanecer en estado latente.",
        op1:"Pérdida de un sistema, equipo o propiedad.",
        op2:"Que se puede expresar de forma cuantitativa.",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"Seleccione los Tipos de Reportes de SMS.",
        op0:"Reporte Voluntario de Peligro y Reporte Obligatorio de Incidente.",
        op1:"Reporte de Interferencia Ilícita.",
        op2:"Reporte de Amenaza de Bomba.",
        correcta:"0"
    },
    {
        id:7,
        pregunta:"¿Para qué utilizamos el Reporte Obligatorio Incidente?",
        op0:"Para Reportar un evento ocurrido.",
        op1:"Para identificar un peligro.",
        op2:"Para reportar de manera confidencial los eventos.",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"¿Para qué utilizamos el Reporte Voluntario de Peligro?",
        op0:"Para Reportar un evento ocurrido.",
        op1:"Para identificar un peligro.",
        op2:"Para reportar de manera confidencial los eventos.",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"¿Seleccione la Estructura del SMS?",
        op0:"4 Componentes y 12 Elementos.",
        op1:"4 Componentes y 15 Elementos.",
        op2:"12 Componentes y 4 Elementos.",
        correcta:"0"
    },
    {
        id:10,
        pregunta:"¿Bajo que RAV se rige el SMS?",
        op0:"RAV-6.",
        op1:"RAV-5.",
        op2:"RAV-4.",
        correcta:"1"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}