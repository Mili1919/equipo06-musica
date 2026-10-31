// ============================================================
// SPRINT 3 · US13 · VER MIS PLAYLISTS Y SU CONTENIDO
//
// Escenario 1: tengo playlists creadas -> entro a Tu biblioteca y abro una
//              -> veo sus canciones y puedo reproducirlas.
// Escenario 2: todavía no creé ninguna -> entro a Tu biblioteca
//              -> veo "Todavía no tenés playlists" y el botón para crear una.
//
// Usa la lista "playlists" (playlists.js), crearFila (catalogo.js),
// pintarCorazones (favoritas.js) y mostrarPantalla (menu.js).
// ============================================================

const listaPlaylists = document.getElementById("lista-playlists");
const mensajePlaylistsVacio = document.getElementById("playlists-vacio");
const listaPlaylist = document.getElementById("lista-playlist");
const mensajePlaylistVacia = document.getElementById("playlist-vacia");

// Posición (dentro de "playlists") de la playlist que está abierta. -1 = ninguna.
let playlistAbierta = -1;

// Dibuja en Tu biblioteca una fila por cada playlist, debajo de "Tus favoritas"
function mostrarPlaylists() {
  listaPlaylists.innerHTML = "";

  playlists.forEach(function (playlist, indice) {
    const item = document.createElement("li");
    const tarjeta = document.createElement("button");
    tarjeta.className = "tarjeta tarjeta-playlist";
    tarjeta.dataset.indice = indice;

    // La portada es la de su primera canción; si está vacía, un ícono
    const primera = CANCIONES[playlist.canciones[0]];
    if (primera) {
      const portada = document.createElement("img");
      portada.className = "playlist-portada";
      portada.src = primera.portada;
      portada.alt = "Portada de " + playlist.nombre;
      tarjeta.appendChild(portada);
    } else {
      const icono = document.createElement("span");
      icono.className = "tarjeta-icono playlist-icono";
      icono.textContent = "♪";
      tarjeta.appendChild(icono);
    }

    // El nombre se escribe con textContent para que lo escrito nunca se lea como HTML
    const nombre = document.createElement("b");
    nombre.textContent = playlist.nombre;
    tarjeta.appendChild(nombre);

    item.appendChild(tarjeta);
    listaPlaylists.appendChild(item);
  });

  // Escenario 2: si no hay ninguna, mostramos el mensaje y el botón para crear una
  if (playlists.length === 0) {
    mensajePlaylistsVacio.classList.remove("oculto");
  } else {
    mensajePlaylistsVacio.classList.add("oculto");
  }
}

// Dibuja las canciones de la playlist abierta (con el mismo formato del catálogo)
function mostrarContenidoPlaylist() {
  const playlist = playlists[playlistAbierta];
  listaPlaylist.innerHTML = "";

  document.getElementById("playlist-nombre").textContent = playlist.nombre;

  playlist.canciones.forEach(function (posicion, i) {
    listaPlaylist.appendChild(crearFila(CANCIONES[posicion], posicion, i + 1));
  });

  // Si no quedan canciones, avisamos (lo usa también US12)
  if (playlist.canciones.length === 0) {
    mensajePlaylistVacia.classList.remove("oculto");
  } else {
    mensajePlaylistVacia.classList.add("oculto");
  }

  pintarCorazones();
}

// Escenario 1: al tocar una playlist, la abrimos
listaPlaylists.addEventListener("click", function (evento) {
  const tarjeta = evento.target.closest(".tarjeta-playlist");
  if (!tarjeta) return;

  playlistAbierta = Number(tarjeta.dataset.indice);
  mostrarContenidoPlaylist();
  mostrarPantalla("playlist");
});

// Al abrir la app dibujamos las playlists que ya estaban guardadas
mostrarPlaylists();
