// US05 - PASAR A LA CANCION SIGUIENTE O ANTERIOR

// Obtenemos los botones
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");

// Pasar a la cancion siguiente
btnSiguiente.addEventListener("click", function () {

    // Comprobamos si hay una cancion seleccionada
    if (posicionActual === -1) {
        return;
    }

    // Si estamos en la ultima cancion, detenemos la reproduccion
    if (posicionActual === CANCIONES.length - 1) {
        audio.pause();
        audio.currentTime = 0;
        mostrarAviso("Terminó la lista");
        return;
    }

    // Reproducimos la siguiente cancion
    reproducirCancion(posicionActual + 1);
});

// Pasar a la cancion anterior
btnAnterior.addEventListener("click", function () {

    // Comprobamos si hay una cancion seleccionada
    if (posicionActual === -1) {
        return;
    }

    // Si estamos en la primera cancion, no retrocedemos
    if (posicionActual === 0) {
        return;
    }


    // Reproducimos la cancion anterior
    reproducirCancion(posicionActual - 1);
});



   // Para el botón Play del detalle (US02): reproduce una canción de la lista actual
   let listaActual = [];

   function sonarLugar(lugar) {
       reproducirCancion(listaActual[lugar]);
   }
