// US02 - DETALLE DE UNA CANCIÓN
// Responsable: Equipo

const vistaInicio = document.getElementById("vista-inicio");
const vistaDetalle = document.getElementById("vista-detalle");
const btnVolver = document.getElementById("btn-volver");
const detallePortada = document.getElementById("detalle-portada");
const detalleNombre = document.getElementById("detalle-nombre");
const detalleArtista = document.getElementById("detalle-artista");
const detalleAlbum = document.getElementById("detalle-album");
const detalleGenero = document.getElementById("detalle-genero");
const detalleDuracion = document.getElementById("detalle-duracion");
const btnReproducirDetalle = document.getElementById("btn-reproducir-detalle");
const detalleNoDisponible = document.getElementById("detalle-no-disponible");

let posicionDetalle = null;

// Mostrar detalle al hacer clic en el nombre de la canción
const listaCanciones = document.getElementById("lista-canciones");
if (listaCanciones) {
  listaCanciones.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("fila-nombre")) {
      const posicion = evento.target.dataset.posicion;
      posicionDetalle = parseInt(posicion);
      const cancion = CANCIONES[posicionDetalle];

      // Escenario 2: si no está disponible
      if (cancion.disponible === false) {
        vistaInicio.classList.add("oculto");
        vistaDetalle.classList.remove("oculto");
        detalleNoDisponible.classList.remove("oculto");
        // Ocultar info
        detallePortada.classList.add("oculto");
        detalleNombre.textContent = cancion.nombre;
        detalleArtista.textContent = cancion.artista;
        detalleAlbum.textContent = cancion.album || "";
        detalleGenero.textContent = cancion.genero || "";
        detalleDuracion.textContent = cancion.duracion || "";
        btnReproducirDetalle.style.display = "none";
        // Volver a inicio después de mostrar mensaje
        setTimeout(function () {
          volverAInicio();
        }, 1500);
        return;
      }

      // Escenario 1: mostrar detalle completo
      vistaInicio.classList.add("oculto");
      vistaDetalle.classList.remove("oculto");
      detalleNoDisponible.classList.add("oculto");
      detallePortada.classList.remove("oculto");
      btnReproducirDetalle.style.display = "inline-block";

      detallePortada.src = cancion.portada;
      detallePortada.alt = "Portada de " + cancion.nombre;
      detalleNombre.textContent = cancion.nombre;
      detalleArtista.textContent = cancion.artista;
      detalleAlbum.textContent = cancion.album || "-";
      detalleGenero.textContent = cancion.genero || "-";
      detalleDuracion.textContent = cancion.duracion || "-";
    }
  });
}

// Volver a inicio
function volverAInicio() {
  vistaDetalle.classList.add("oculto");
  vistaInicio.classList.remove("oculto");
  detalleNoDisponible.classList.add("oculto");
  posicionDetalle = null;
}

if (btnVolver) {
  btnVolver.addEventListener("click", volverAInicio);
}

// Reproducir desde detalle
if (btnReproducirDetalle) {
  btnReproducirDetalle.addEventListener("click", function () {
    if (posicionDetalle === null) return;
    const cancion = CANCIONES[posicionDetalle];
    
    if (cancion.disponible === false) {
      return;
    }

    // Usar la misma lógica que reproductor.js
    const audio = document.getElementById("audio");
    const filas = document.querySelectorAll(".fila");
    const mensajeError = document.getElementById("mensaje-error");
    const fila = filas[posicionDetalle];

    if (mensajeError) mensajeError.classList.add("oculto");
    if (audio) {
      audio.src = cancion.archivo;
      audio.play()
        .then(function () {
          filas.forEach(function (otraFila) {
            otraFila.classList.remove("sonando");
          });
          if (fila) fila.classList.add("sonando");
        })
        .catch(function () {
          if (mensajeError) mensajeError.classList.remove("oculto");
          filas.forEach(function (otraFila) {
            otraFila.classList.remove("sonando");
          });
        });
    }
  });
}
