// Avisos cortos abajo de la pantalla (Sprint 2)
// Ejemplo: mostrarAviso("Terminó la lista")

function mostrarAviso(texto) {
  const aviso = document.getElementById("mensaje-aviso");
  aviso.textContent = texto;
  aviso.classList.remove("oculto");

  // A los 3 segundos lo escondemos
  setTimeout(function () {
    aviso.classList.add("oculto");
  }, 3000);
}
