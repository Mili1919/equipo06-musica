// US06 - Buscar una canción por su nombre - Juan
// Escenario 1: entro a Buscar y escribo parte del nombre (ej: "luz") -> veo las canciones
//              que coinciden, con portada, nombre y artista.
// Escenario 2: escribo algo que no está (ej: "zzz") -> veo "No se encontraron resultados".

// Usa crearFila (catalogo.js) y pintarCorazones (favoritas.js), que se cargan antes en index.html.

const buscador = document.getElementById("buscador");
const buscadorAyuda = document.getElementById("buscador-ayuda");
const listaResultados = document.getElementById("lista-resultados");
const sinResultados = document.getElementById("sin-resultados");

// Pasa el texto a minúsculas y le saca los acentos,
// así "cafe" encuentra "Café con Lluvia" y "LUZ" encuentra "Luz de Marzo"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function buscarCanciones() {
  const texto = normalizar(buscador.value.trim());
  listaResultados.innerHTML = "";

  // Si el buscador está vacío, volvemos a mostrar la ayuda
  if (texto === "") {
    buscadorAyuda.classList.remove("oculto");
    sinResultados.classList.add("oculto");
    return;
  }
  buscadorAyuda.classList.add("oculto");

  // Escenario 1: armamos una fila por cada canción cuyo nombre contiene lo escrito
  let cantidad = 0;
  CANCIONES.forEach(function (cancion, posicion) {
    if (normalizar(cancion.nombre).includes(texto)) {
      cantidad++;
      listaResultados.appendChild(crearFila(cancion, posicion, cantidad));
    }
  });

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
