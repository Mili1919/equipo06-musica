// ============================================================
// SPRINT 3 · US11 · AGREGAR CANCIONES A UNA PLAYLIST
//
// Escenario 1: estoy viendo una canción -> abro su menú (⋯), elijo "Agregar a playlist"
//              y una playlist -> la canción se agrega al final de esa playlist.
// Escenario 2: la canción ya está en esa playlist -> intento agregarla de nuevo
//              -> la app me avisa que ya está y no la duplica.
//
// Usa mostrarMenuFila / cerrarMenuFila y la lista "playlists" (playlists.js),
// mostrarPlaylists (ver-playlists.js) y mostrarAviso (aviso.js).
// ============================================================

// Clic en el menú (⋯) de una canción de cualquier lista
// (dentro de una playlist el menú es otro: lo maneja quitar-playlist.js)
document.addEventListener("click", function (evento) {
  const boton = evento.target.closest(".btn-menu-fila");
  if (!boton) return;
  if (boton.closest("#lista-playlist")) return;

  const posicion = Number(boton.closest(".fila").dataset.posicion);

  mostrarMenuFila(boton, [
    {
      texto: "Agregar a playlist",
      accion: function () {
        elegirPlaylist(boton, posicion);
      }
    }
  ]);
});

// Segundo paso del menú: la lista de mis playlists para elegir una
function elegirPlaylist(boton, posicion) {
  if (playlists.length === 0) {
    cerrarMenuFila();
    mostrarAviso("Todavía no tenés playlists. Creá una en Tu biblioteca");
    return;
  }

  const opciones = playlists.map(function (playlist, indice) {
    return {
      texto: playlist.nombre,
      accion: function () {
        agregarCancion(posicion, indice);
      }
    };
  });
  mostrarMenuFila(boton, opciones);
}

function agregarCancion(posicion, indice) {
  const playlist = playlists[indice];
  cerrarMenuFila();

  // Escenario 2: si ya está, avisamos y no la duplicamos
  if (playlist.canciones.includes(posicion)) {
    mostrarAviso("Esta canción ya está en la playlist");
    return;
  }

  // Escenario 1: se agrega al final
  playlist.canciones.push(posicion);
  guardarPlaylists();
  mostrarPlaylists();
  mostrarAviso("Se agregó a " + playlist.nombre);
}
