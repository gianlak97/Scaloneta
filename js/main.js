const preguntas = [
    {
        pregunta: "¿Quién metió el gol de la final de la Copa América 2024?",
        opciones: ["Lionel Messi", "Angel Di Maria", "Lautaro Martinez"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Quién lleva el número 11 en la camiseta?",
        opciones: ["Cuti Romero", "Angel Di Maria", "Nicolas Gonzalez"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿A quién le dicen 'El Motorcito'?",
        opciones: ["Lionel Messi", "Lisandro Martinez", "Rodrigo De Paul"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuántos penales atajó el Dibu contra Ecuador?",
        opciones: ["atajó solo un penal", "atajó dos penales", "atajó tres penales"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "Incluyendo la última copa América, ¿Cuántas copas tiene Argentina?",
        opciones: ["16", "18", "19"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Qué dupla fue la ganadora del torneo de truco en la Copa América 2024?",
        opciones: ["El Cuti Romero y Licha Martinez", "Leandro Paredes y Nico Otamendi", "Lionel Messi y Rodrigo De Paul"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuántos penales lleva atajados 'El Dibu Martinez' en la Selección?",
        opciones: ["6", "8", "10"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuántos goles lleva Messi, el máximo goleador de la historia de Argentina?",
        opciones: ["109 goles", "112 goles", "120 goles"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuántos partidos invictos tuvo Argentina antes del partido contra Arabia Saudita en el mundial 2022?",
        opciones: ["34 partidos invictos", "36 partidos invictos", "38 partidos invictos"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿En qué año debutó Messi en la Selección Argentina?",
        opciones: ["En 2005", "En 2006", "En 2007"],
        respuestaCorrecta: 0
    }
];

// Más preguntas usando push
preguntas.push(
    {
        pregunta:"3 jugadores de la selección mayor jugaron ¿Quienes fueron?",
        opciones:["Otamendi, Julian Alvarez y Rulli", "Messi, De Paul y Di Maria", "El Cuti, El Dibu y Paredes"],
        respuestaCorrecta: 0
    }
);

let preguntaActual = parseInt(localStorage.getItem('preguntaActual')) || 0;
let calificacion = parseInt(localStorage.getItem('calificacion')) || 0;

function mostrarPregunta() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    if (preguntaActual < preguntas.length) {
        const preguntaObj = preguntas[preguntaActual];
        const preguntaTexto = document.createElement('h2');
        preguntaTexto.textContent = preguntaObj.pregunta;
        quizContainer.append(preguntaTexto);

        const opcionesLista = document.createElement('ul');
        opcionesLista.className = 'options';

        preguntaObj.opciones.forEach((opcion, index) => {
            const opcionItem = document.createElement('li');
            const opcionBoton = document.createElement('button');
            opcionBoton.textContent = opcion;
            opcionBoton.onclick = () => verificarRespuesta(index);
            opcionItem.append(opcionBoton);
            opcionesLista.append(opcionItem);
        });

        quizContainer.append(opcionesLista);
    } else {
        mostrarResultado();
    }
}

function verificarRespuesta(index) {
    const preguntaObj = preguntas[preguntaActual];
    let mensaje = '';
    let icono = '';

    if (index === preguntaObj.respuestaCorrecta) {
        calificacion++;
        mensaje = '¡Muy bien, seguí así!';
        icono = 'success';
    } else {
        mensaje = 'Muy mal, pero bueno sigamos.';
        icono = 'error';
        if (preguntaActual <= 5) {
            calificacion--; // Resta puntos en las últimas preguntas
        }
    }

    Swal.fire({
        title: mensaje,
        icon: icono,
        confirmButtonText: 'Continuar'
    }).then(() => {
        preguntaActual++;

        // Guardar estado en localStorage
        localStorage.setItem('preguntaActual', preguntaActual);
        localStorage.setItem('calificacion', calificacion);

        mostrarPregunta();
    });
}

function mostrarResultado() {
    const quizContainer = document.getElementById('quiz-container');

    let resultadoMensaje = '';
    if (calificacion >= 7) {
        resultadoMensaje = `Felicitaciones, aguante la Scaloneta, sos un gran hincha, obtuviste un ${calificacion} de 10.`;
    } else if (calificacion >= 4) {
        resultadoMensaje = `Bien, pero no sos tan fanático de la Argentina, obtuviste un ${calificacion} de 10.`;
    } else {
        resultadoMensaje = `Al parecer no sos tan Argentino, o no te gusta el futbol. Obtuviste un ${calificacion} de 10.`;
    }

    const resultadoTexto = document.createElement('h2');
    resultadoTexto.textContent = resultadoMensaje;
    quizContainer.append(resultadoTexto);

    // Limpiar el estado guardado después de mostrar el resultado
    localStorage.removeItem('preguntaActual');
    localStorage.removeItem('calificacion');
}

// Iniciar el cuestionario
mostrarPregunta();