// US08 - Marcar una canción como favorita - Erika
// Escenario 1: hago clic en el corazón -> se pinta y la canción se guarda en "Tus favoritas".
// Escenario 2: la canción ya es favorita -> hago clic otra vez -> queda vacío y se saca.

// Las favoritas se guardan en el navegador (localStorage) para que no se pierdan al cerrar.
// Se guarda la posición de cada canción; la última que se agrega va primera.
let favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];

function esFavorita(posicion) {
  return favoritas.includes(posicion);
}

// Pinta los corazones de todas las listas y el de la barra de abajo
function pintarCorazones() {
  document.querySelectorAll(".fila .btn-corazon").forEach(function (corazon) {
    const posicion = Number(corazon.dataset.posicion);
    if (esFavorita(posicion)) {
      corazon.textContent = "♥";
      corazon.classList.add("favorita");
    } else {
      corazon.textContent = "♡";
      corazon.classList.remove("favorita");
    }
  });

  // Corazón de la barra: es el de la canción que está sonando (buscarCancionActual está en barra.js)
  const corazonBarra = document.getElementById("barra-corazon");
  const posicionSonando = CANCIONES.indexOf(buscarCancionActual());
  if (esFavorita(posicionSonando)) {
    corazonBarra.textContent = "♥";
    corazonBarra.classList.add("favorita");
  } else {
    corazonBarra.textContent = "♡";
    corazonBarra.classList.remove("favorita");
  }
}

function marcarODesmarcar(posicion) {
  if (esFavorita(posicion)) {
    // Escenario 2: la sacamos
    favoritas = favoritas.filter(function (p) {
      return p !== posicion;
    });
  } else {
    // Escenario 1: la agregamos al principio
    favoritas.unshift(posicion);
  }
  localStorage.setItem("favoritas", JSON.stringify(favoritas));
  pintarCorazones();
}

// Clic en el corazón de una fila
document.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("btn-corazon") && evento.target.id !== "barra-corazon") {
    marcarODesmarcar(Number(evento.target.dataset.posicion));
  }
});

// Clic en el corazón de la barra de abajo
document.getElementById("barra-corazon").addEventListener("click", function () {
  const posicionSonando = CANCIONES.indexOf(buscarCancionActual());
  if (posicionSonando !== -1) {
    marcarODesmarcar(posicionSonando);
  }
});

// Pintamos los corazones al abrir la app y cada vez que empieza una canción
document.addEventListener("DOMContentLoaded", pintarCorazones);
audio.addEventListener("play", pintarCorazones);
