// US03 - REPRODUCIR UNA CANCION DE LA LISTA

// Obtenemos el reproductor de audio y el mensaje de error
const audio = document.getElementById("audio");
const lista = document.getElementById("lista-canciones");
const mensajeError = document.getElementById("mensaje-error");

// Reproducir una cancion al hacer clic en el boton Play
lista.addEventListener("click", function (evento) {

    // Comprobamos si se hizo clic en el boton Play
    if (evento.target.classList.contains("btn-play-fila")) {

        // Obtenemos la fila de la cancion seleccionada
        const fila = evento.target.closest(".fila");

        // Obtenemos la posicion de la cancion en la lista
        const posicion = fila.dataset.posicion;

        // Buscamos los datos de la cancion seleccionada
        const cancion = CANCIONES[posicion];

        // Ocultamos el mensaje de error anterior
        mensajeError.classList.add("oculto");

        // Indicamos que archivo de audio debe reproducirse
        audio.src = cancion.archivo;

        // Intentamos reproducir la cancion
        audio.play()
            .then(function () {

                // Quitamos la marca verde de las demas canciones
                const filas = document.querySelectorAll(".fila");

                filas.forEach(function (otraFila) {
                    otraFila.classList.remove("sonando");
                });

                // Marcamos en verde la cancion que esta sonando
                fila.classList.add("sonando");

            })
            .catch(function () {

                // Si no se puede reproducir, mostramos el mensaje de error
                mensajeError.classList.remove("oculto");

                // Quitamos la marca verde de todas las canciones
                const filas = document.querySelectorAll(".fila");

                filas.forEach(function (otraFila) {
                    otraFila.classList.remove("sonando");
                });
            });
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