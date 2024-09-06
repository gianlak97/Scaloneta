let preguntas = [];
let preguntaActual = parseInt(localStorage.getItem('preguntaActual')) || 0;
let calificacion = parseInt(localStorage.getItem('calificacion')) || 0;

async function obtenerPreguntas() {
    try {
        const respuesta = await fetch('./json/preguntas.json');

        preguntas = await respuesta.json();
        mostrarPregunta(); // Iniciar el cuestionario una vez que las preguntas se han cargado
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        alert('Hubo un problema al cargar las preguntas. Inténtalo más tarde.');
    }
}

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

// Iniciar el cuestionario obteniendo las preguntas
obtenerPreguntas();
