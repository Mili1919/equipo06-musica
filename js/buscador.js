// US06 - Buscar una canción por su nombre - Juan
// Escenario 1: entro a Buscar y escribo parte del nombre (ej: "luz") -> veo las canciones
//              que coinciden, con portada, nombre y artista.
// Escenario 2: escribo algo que no está (ej: "zzz") -> veo "No se encontraron resultados".
//
// SPRINT 3 - US18 - Buscar por artista
// Escenario 1: escribo el nombre de un artista -> veo arriba una tarjeta del artista
//              (portada de su primera canción y su nombre) y debajo sus canciones.
// Escenario 2: escribo un artista que no está -> veo "No se encontraron resultados".

// Usa crearFila (catalogo.js) y pintarCorazones (favoritas.js), que se cargan antes en index.html.

const buscador = document.getElementById("buscador");
const buscadorAyuda = document.getElementById("buscador-ayuda");
const listaResultados = document.getElementById("lista-resultados");
const sinResultados = document.getElementById("sin-resultados");
const listaArtistas = document.getElementById("lista-artistas");

// Pasa el texto a minúsculas y le saca los acentos,
// así "cafe" encuentra "Café con Lluvia" y "LUZ" encuentra "Luz de Marzo"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// US18: tarjeta con la portada y el nombre del artista
function crearTarjetaArtista(cancion) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-artista";

  const portada = document.createElement("img");
  portada.src = cancion.portada;
  portada.alt = "Portada de " + cancion.artista;

  const nombre = document.createElement("b");
  nombre.textContent = cancion.artista;

  tarjeta.appendChild(portada);
  tarjeta.appendChild(nombre);
  return tarjeta;
}

function buscarCanciones() {
  const texto = normalizar(buscador.value.trim());
  listaResultados.innerHTML = "";
  listaArtistas.innerHTML = "";
  listaArtistas.classList.add("oculto");

  // Si el buscador está vacío, volvemos a mostrar la ayuda
  if (texto === "") {
    buscadorAyuda.classList.remove("oculto");
    sinResultados.classList.add("oculto");
    return;
  }
  buscadorAyuda.classList.add("oculto");

  // Escenario 1: armamos una fila por cada canción cuyo nombre o artista contiene lo escrito
  let cantidad = 0;
  const artistasVistos = [];
  CANCIONES.forEach(function (cancion, posicion) {
    const coincideArtista = normalizar(cancion.artista).includes(texto);
    if (normalizar(cancion.nombre).includes(texto) || coincideArtista) {
      cantidad++;
      listaResultados.appendChild(crearFila(cancion, posicion, cantidad));
    }
    // US18: una tarjeta por cada artista que coincide (con la portada de su primera canción)
    if (coincideArtista && !artistasVistos.includes(cancion.artista)) {
      artistasVistos.push(cancion.artista);
      listaArtistas.appendChild(crearTarjetaArtista(cancion));
    }
  });
  if (artistasVistos.length > 0) {
    listaArtistas.classList.remove("oculto");
  }

  // Escenario 2: si no coincidió ninguna, mostramos el mensaje
  if (cantidad === 0) {
    sinResultados.classList.remove("oculto");
  } else {
    sinResultados.classList.add("oculto");
  }

  // Los corazones de los resultados se pintan igual que en el catálogo
  pintarCorazones();
}

// Buscamos cada vez que se escribe o se borra una letra
buscador.addEventListener("input", buscarCanciones);

// Al entrar a Buscar desde el menú, dejamos el cursor listo para escribir
document.querySelector('.menu-opcion[data-pantalla="buscar"]').addEventListener("click", function () {
  buscador.focus();
});
