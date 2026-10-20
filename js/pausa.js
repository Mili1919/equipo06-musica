// ============================================================
// US04 · PAUSAR Y REANUDAR UNA CANCION · Responsable: JAZMIN
//
// Escenario 1: estoy escuchando una cancion -> clic en el boton
//              -> la cancion se pausa y el icono cambia a Play.
// Escenario 2: la cancion esta en pausa -> clic en el boton
//              -> la cancion sigue sonando desde donde quedo.
//
// Usa "audio" y "barra", que ya estan declarados en reproductor.js
// y barra.js (por eso este archivo se carga despues en index.html).
// ============================================================

const btnPlayPausa = document.getElementById("btn-play-pausa");

// Cambia el icono y el aria-label del boton segun el estado del audio
function actualizarBoton() {
  if (audio.paused) {
    btnPlayPausa.textContent = "▶"; // Play
    btnPlayPausa.setAttribute("aria-label", "Reanudar");
    barra.classList.add("pausada");
  } else {
    btnPlayPausa.textContent = "❚❚"; // Pausa
    btnPlayPausa.setAttribute("aria-label", "Pausa");
    barra.classList.remove("pausada");
  }
}

// Clic en el boton: si esta sonando lo pausa, si esta pausado lo reanuda
btnPlayPausa.addEventListener("click", function () {
  // Si todavia no se cargo ninguna cancion, no hace nada
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// Mantener el boton sincronizado con el estado real del audio
audio.addEventListener("play", actualizarBoton);
audio.addEventListener("pause", actualizarBoton);
