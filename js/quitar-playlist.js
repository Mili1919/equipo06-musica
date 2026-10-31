// ============================================================
// SPRINT 3 · US12 · QUITAR CANCIONES DE UNA PLAYLIST
//
// Escenario 1: estoy viendo una playlist mía -> abro el menú (⋯) de una canción
//              y elijo "Quitar de esta playlist" -> la canción deja de aparecer.
// Escenario 2: quito la única canción de la playlist -> la playlist queda vacía
//              y veo el mensaje "Tu playlist está vacía".
//
// Usa mostrarMenuFila / cerrarMenuFila y la lista "playlists" (playlists.js),
// y mostrarContenidoPlaylist / mostrarPlaylists (ver-playlists.js).
// ============================================================

// Clic en el menú (⋯) de una canción, solo dentro de una playlist
// (en las demás listas el menú es otro: lo maneja agregar-playlist.js)
document.addEventListener("click", function (evento) {
  const boton = evento.target.closest(".btn-menu-fila");
  if (!boton) return;
  if (!boton.closest("#lista-playlist")) return;

  const posicion = Number(boton.closest(".fila").dataset.posicion);

  mostrarMenuFila(boton, [
    {
      texto: "Quitar de esta playlist",
      accion: function () {
        quitarCancion(posicion);
      }
    }
  ]);
});

function quitarCancion(posicion) {
  const playlist = playlists[playlistAbierta];
  cerrarMenuFila();

  // Escenario 1: sacamos la canción de la playlist
  playlist.canciones = playlist.canciones.filter(function (p) {
    return p !== posicion;
  });
  guardarPlaylists();

  // Escenario 2: si era la única, mostrarContenidoPlaylist muestra "Tu playlist está vacía"
  mostrarContenidoPlaylist();
  mostrarPlaylists();
}
