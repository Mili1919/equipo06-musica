
// US03 - REPRODUCIR UNA CANCION DE LA LISTA

// Obtenemos el reproductor de audio y el mensaje de error
const audio = document.getElementById("audio");
const lista = document.getElementById("lista-canciones");
const mensajeError = document.getElementById("mensaje-error");

// Guardamos la posicion de la cancion que esta sonando
let posicionActual = -1;

// Reproduce una cancion segun su posicion en la lista
function reproducirCancion(posicion) {

    // Comprobamos que la posicion exista
    if (posicion < 0 || posicion >= CANCIONES.length) {
        return;
    }

    // Guardamos la posicion seleccionada
    posicionActual = posicion;

    // Buscamos los datos de la cancion
    const cancion = CANCIONES[posicionActual];

    // Ocultamos el mensaje de error anterior
    mensajeError.classList.add("oculto");

    // Indicamos que archivo de audio debe reproducirse
    audio.src = cancion.archivo;

    // Intentamos reproducir el audio
    audio.play()
        .then(function () {

            // Quitamos la marca verde de las demas canciones
            const filas = document.querySelectorAll(".fila");

            filas.forEach(function (otraFila) {
                otraFila.classList.remove("sonando");
            });

            // Marcamos en verde la cancion que esta sonando
            const fila = document.querySelector(
                '.fila[data-posicion="' + posicionActual + '"]'
            );

            if (fila) {
                fila.classList.add("sonando");
            }

        })
        .catch(function () {

            // Si no se puede reproducir, mostramos el mensaje de error
            mensajeError.classList.remove("oculto");

            // Quitamos la marca verde de todas las canciones
            const filas = document.querySelectorAll(".fila");

            filas.forEach(function (fila) {
                fila.classList.remove("sonando");
            });
        });
}

// Reproducir una cancion al hacer clic en el boton Play de una fila
   document.addEventListener("click", function (evento) {

    if (evento.target.classList.contains("btn-play-fila")) {

        // Obtenemos la fila de la cancion seleccionada
        const fila = evento.target.closest(".fila");

        // Obtenemos su posicion
        const posicion = Number(fila.dataset.posicion);

        // Reproducimos la cancion seleccionada
        reproducirCancion(posicion);
    }
});

// Si ocurre un error al cargar el archivo de audio
audio.addEventListener("error", function () {

    mensajeError.classList.remove("oculto");

    const filas = document.querySelectorAll(".fila");

    filas.forEach(function (fila) {
        fila.classList.remove("sonando");
    });
});
