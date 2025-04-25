//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"Conjunto de procedimientos que permite garantizar que una aeronave, cumplen con los requisitos aplicables de aeronavegabilidad.",
        op0:"Mantenimiento.",
        op1:"Seguridad Operacional.",
        op2:"Mantenimiento de la aeronavegabilidad.",
        correcta:"2"
    },
    {
        id:1,
        pregunta:"Realización de las tareas requeridas en una aeronave y componentes de aeronave para asegurar el mantenimiento de la aeronavegabilidad de los mismos.",
        op0:"Mantenimiento.",
        op1:"Aeronavegabilidad.",
        op2:"Componente de aeronave.",
        correcta:"0"
    },
    {
        id:2,
        pregunta:"Todo equipo, partes de una reparación o modificación e instrumento, incluyendo motor y hélice.",
        op0:"Reparación.",
        op1:"Reacondicionamiento. ",
        op2:"Componente de aeronave.",
        correcta:"2"
    },
    {
        id:3,
        pregunta:"Es la Restauración de una aeronave y/o componentes de aeronaves a su condición de aeronavegabilidad, de conformidad con los requisitos adecuados de aeronavegabilidad",
        op0:"Reparación.",
        op1:"Reacondicionamiento.",
        op2:"Componente de aeronave.",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"Denominado también reparación general, es el restablecimiento de una aeronave o componente de aeronave por inspección y reemplazo.",
        op0:"Trazabilidad",
        op1:"Reparacion",
        op2:"Reacondicionamiento (overhaul)",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"Es el acto de examinar una aeronave o componente de aeronave para establecer la conformidad con un dato de mantenimiento.",
        op0:"Supervisión.",
        op1:"Inspección.",
        op2:"Revisión.",
        correcta:"1"
    },
    {
        id:6,
        pregunta:": Ciclos, horas acumuladas, o cualquier otro límite de reemplazo obligatorio de un componente.",
        op0:"Estatus de vida.",
        op1:"Trazabilidad.",
        op2:"Componente de Aeronave.",
        correcta:"0"
    },
    {
        id:7,
        pregunta:"Capacidad para seguir la historia, la aplicación o la localización de todo aquello que está bajo consideración, relacionada con el origen de los materiales y las partes.",
        op0:"Trazabilidad.",
        op1:"Inspección",
        op2:"Revisión.",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"¿Que es el MOM?",
        op0:"Manual de la Organización de Mantenimiento.",
        op1:"Manual de Procedimientos de la OMA.",
        op2:"Manual de Mantenimiento.",
        correcta:"0"
    },
    {
        id:9,
        pregunta:"¿Cuantas parte está estructurado el MOM?",
        op0:"10 Partes.",
        op1:"8 Partes",
        op2:"9 Partes.",
        correcta:"0"
    },
    {
        id:10,
        pregunta:"¿Que describe la parte 4 del MOM",
        op0:"PROCEDIMIENTOS DE SMS",
        op1:"PROCEDIMIENTOS DE CALIDAD",
        op2:"PROCEDIMIENTOS DEL SISTEMA INSPECCIÓN.",
        correcta:"2"
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
