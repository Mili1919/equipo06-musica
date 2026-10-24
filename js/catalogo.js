// US01 · VER EL CATÁLOGO DE CANCIONES · Responsable: ERIKA
// Escenario 1: entro a la app -> veo la lista con portada, nombre y artista.
// Escenario 2: no hay canciones -> veo "Todavía no hay canciones disponibles".


function mostrarCatalogo() {
  const lista = document.getElementById("lista-canciones");
  const mensajeVacio = document.getElementById("mensaje-vacio");

  // Escenario 2: si la lista está vacía, se muestra el mensaje y terminamos
  if (CANCIONES.length === 0) {
    mensajeVacio.classList.remove("oculto");
    return;
  }

  // Escenario 1: Se arma una fila por cada canción
  CANCIONES.forEach(function (cancion, posicion) {
    const fila = document.createElement("li");
    fila.className = "fila";
    fila.dataset.posicion = posicion; // Se guarda qué canción es (la usa US03)

    fila.innerHTML = `
      <div class="fila-inicio">
        <span class="fila-numero">${posicion + 1}</span>
        <button class="btn-play-fila" aria-label="Reproducir">▶</button>
      </div>
      <img class="fila-portada" src="${cancion.portada}" alt="Portada de ${cancion.nombre}">
      <div class="fila-datos">
        <p class="fila-nombre">${cancion.nombre}</p>
        <p class="fila-artista">${cancion.artista}</p>
      </div>
      <button class="btn-corazon" data-posicion="${posicion}">♡</button>
      <span class="fila-duracion">${cancion.duracion}</span>
    `;

    lista.appendChild(fila);
  });
}

// Cuando la página termina de cargar, se dibuja el catálogo
document.addEventListener("DOMContentLoaded", mostrarCatalogo);

// Sprint 2 (Erika): la misma fila del catálogo, para usarla en Buscar y en Tus favoritas.
// "numero" es el número que se ve a la izquierda de la fila.
function crearFila(cancion, posicion, numero) {
  const fila = document.createElement("li");
  fila.className = "fila";
  fila.dataset.posicion = posicion;

  fila.innerHTML = `
    <div class="fila-inicio">
      <span class="fila-numero">${numero}</span>
      <button class="btn-play-fila" aria-label="Reproducir">▶</button>
    </div>
    <img class="fila-portada" src="${cancion.portada}" alt="Portada de ${cancion.nombre}">
    <div class="fila-datos">
      <p class="fila-nombre">${cancion.nombre}</p>
      <p class="fila-artista">${cancion.artista}</p>
    </div>
    <button class="btn-corazon" data-posicion="${posicion}">♡</button>
    <span class="fila-duracion">${cancion.duracion}</span>
  `;

  return fila;
}
