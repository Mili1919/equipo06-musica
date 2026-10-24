// US09 - Ver mis canciones favoritas - Erika
// Escenario 1: tengo favoritas -> entro a Tu biblioteca y abro "Tus favoritas" -> veo la lista y puedo reproducirlas.
// Escenario 2: no tengo favoritas -> abro "Tus favoritas" -> veo "Todavía no tenés favoritas" y cómo agregarlas.

const listaFavoritas = document.getElementById("lista-favoritas");

// Arma la lista de favoritas (la última agregada aparece primera)
function mostrarFavoritas() {
  listaFavoritas.innerHTML = "";

  favoritas.forEach(function (posicion, i) {
    listaFavoritas.appendChild(crearFila(CANCIONES[posicion], posicion, i + 1));
  });

  // Escenario 2: si no hay ninguna, mostramos el mensaje
  if (favoritas.length === 0) {
    document.getElementById("favoritas-vacio").classList.remove("oculto");
  } else {
    document.getElementById("favoritas-vacio").classList.add("oculto");
  }

  pintarCorazones();
}

// Actualiza la cantidad que dice la tarjeta "Tus favoritas"
function actualizarCantidad() {
  if (favoritas.length === 1) {
    document.getElementById("cantidad-favoritas").textContent = "1 canción";
  } else {
    document.getElementById("cantidad-favoritas").textContent = favoritas.length + " canciones";
  }
}

// Al tocar la tarjeta, abrimos Tus favoritas
document.getElementById("tarjeta-favoritas").addEventListener("click", function () {
  mostrarFavoritas();
  mostrarPantalla("favoritas");
});

// Al entrar a Tu biblioteca, actualizamos la cantidad
document.querySelector('.menu-opcion[data-pantalla="biblioteca"]').addEventListener("click", actualizarCantidad);

// Si saca una favorita estando en la lista, la lista se actualiza
document.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("btn-corazon")) {
    actualizarCantidad();
    if (!document.getElementById("pantalla-favoritas").classList.contains("oculto")) {
      mostrarFavoritas();
    }
  }
});
