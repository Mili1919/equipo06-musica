// US02 - Ver el detalle de una canción - Aixa
// Escenario 1: hago clic en el nombre de una canción -> veo su detalle completo y el botón Play.
// Escenario 2: la canción ya no está disponible -> veo "Esta canción no está disponible" y vuelvo al catálogo.

let posicionDetalle = -1;

// Clic en el nombre de una canción, en cualquier lista
document.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("fila-nombre")) {
    const fila = evento.target.closest(".fila");
    const posicion = Number(fila.dataset.posicion);
    const cancion = CANCIONES[posicion];

    // Escenario 2
    if (cancion.disponible === false) {
      mostrarAviso("Esta canción no está disponible");
      mostrarPantalla("inicio");
      return;
    }

    // Escenario 1: completamos los datos y abrimos el detalle
    posicionDetalle = posicion;
    document.getElementById("detalle-portada").src = cancion.portada;
    document.getElementById("detalle-nombre").textContent = cancion.nombre;
    document.getElementById("detalle-artista").textContent = cancion.artista;
    document.getElementById("detalle-album").textContent = cancion.album;
    document.getElementById("detalle-genero").textContent = cancion.genero;
    document.getElementById("detalle-duracion").textContent = cancion.duracion;
    mostrarPantalla("detalle");
  }
});

// Play del detalle: la canción suena dentro de la lista de todo el catálogo (siguiente.js)
document.getElementById("detalle-play").addEventListener("click", function () {
  listaActual = [];
  CANCIONES.forEach(function (cancion, i) {
    listaActual.push(i);
  });
  sonarLugar(posicionDetalle);
});
