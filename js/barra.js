// ============================================================
// US03 · REPRODUCIR UNA CANCIÓN (parte de la BARRA) · Responsable: JUAN
//
// Escenario 1: cuando suena una canción, aparece la barra de abajo
//              con portada, nombre y artista, y la barra de progreso avanza.
// Escenario 2: si el archivo no se puede cargar -> mensaje
//              "No se pudo reproducir la canción" y la app sigue funcionando.
//
// Usa "audio" y "mensajeError", que ya están declarados en reproductor.js
// (por eso este archivo se carga después en index.html).
// ============================================================

const barra = document.getElementById("barra");
const avance = document.getElementById("avance");
const tiempoActual = document.getElementById("tiempo-actual");
const tiempoTotal = document.getElementById("tiempo-total");

// Pasa segundos a formato minutos:segundos (ej: 84 -> "1:24")
function formatearTiempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return min + ":" + String(seg).padStart(2, "0");
}

// Busca en la lista la canción que tiene cargada el reproductor
function buscarCancionActual() {
  return CANCIONES.find(function (cancion) {
    return new URL(cancion.archivo, location.href).href === audio.src;
  });
}

// Cuando el reproductor empieza a cargar una canción nueva, mostramos sus datos en la barra
audio.addEventListener("loadstart", function () {
  const cancion = buscarCancionActual();
  if (!cancion) return;

  document.getElementById("barra-portada").src = cancion.portada;
  document.getElementById("barra-nombre").textContent = cancion.nombre;
  document.getElementById("barra-artista").textContent = cancion.artista;
  avance.style.width = "0%";
  tiempoActual.textContent = "0:00";
  tiempoTotal.textContent = cancion.duracion;
  barra.classList.remove("oculto");
});

// Cuando se conoce la duración real del archivo, la mostramos
audio.addEventListener("loadedmetadata", function () {
  tiempoTotal.textContent = formatearTiempo(audio.duration);
});

// Mientras suena, movemos la barra de progreso
audio.addEventListener("timeupdate", function () {
  if (!audio.duration) return;
  const porcentaje = (audio.currentTime / audio.duration) * 100;
  avance.style.width = porcentaje + "%";
  tiempoActual.textContent = formatearTiempo(audio.currentTime);
});

// Escenario 2: si el archivo no carga, ocultamos la barra.
// El mensaje lo muestra reproductor.js; acá lo sacamos a los 3 segundos.
let temporizadorError;
audio.addEventListener("error", function () {
  barra.classList.add("oculto");
  clearTimeout(temporizadorError);
  temporizadorError = setTimeout(function () {
    mensajeError.classList.add("oculto");
  }, 3000);
});
