// ============================================================
// SPRINT 3 · US10 · CREAR UNA PLAYLIST
//
// Escenario 1: estoy en Tu biblioteca -> hago clic en "+ Crear playlist",
//              escribo un nombre y confirmo -> la playlist aparece en mi biblioteca.
// Escenario 2: intento guardarla sin nombre -> la app me pide que le ponga uno
//              y no la crea.
//
// Este archivo también tiene lo que usan US11, US12 y US13:
//   - la lista "playlists" (se guarda en el navegador, igual que las favoritas)
//   - guardarPlaylists()
//   - mostrarMenuFila() y cerrarMenuFila(): el menú de tres puntos (⋯) de una canción
//
// Usa mostrarAviso (aviso.js) y mostrarPlaylists (ver-playlists.js).
// ============================================================

// Cada playlist es: { nombre: "Trabajo", canciones: [2, 5, ...] }
// Las canciones se guardan por su posición en CANCIONES, igual que las favoritas.
let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

function guardarPlaylists() {
  localStorage.setItem("playlists", JSON.stringify(playlists));
}

// ---------- US10: cuadro para crear una playlist ----------

const fondoCrear = document.getElementById("fondo-crear-playlist");
const campoNombre = document.getElementById("playlist-nombre-nueva");

function abrirCuadroCrear() {
  campoNombre.value = "";
  fondoCrear.classList.remove("oculto");
  campoNombre.focus();
}

function cerrarCuadroCrear() {
  fondoCrear.classList.add("oculto");
}

function crearPlaylist() {
  const nombre = campoNombre.value.trim();

  // Escenario 2: sin nombre no se crea
  if (nombre === "") {
    mostrarAviso("Poné un nombre para tu playlist");
    campoNombre.focus();
    return;
  }

  // Escenario 1: se agrega al final y aparece en Tu biblioteca
  playlists.push({ nombre: nombre, canciones: [] });
  guardarPlaylists();
  mostrarPlaylists();
  cerrarCuadroCrear();
}

// Los dos botones "+ Crear playlist" (arriba y el de cuando no hay playlists)
document.getElementById("btn-crear-playlist").addEventListener("click", abrirCuadroCrear);
document.getElementById("btn-crear-playlist-vacio").addEventListener("click", abrirCuadroCrear);

document.getElementById("btn-confirmar-playlist").addEventListener("click", crearPlaylist);
document.getElementById("btn-cancelar-playlist").addEventListener("click", cerrarCuadroCrear);

// Enter confirma y Escape cancela
campoNombre.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    crearPlaylist();
  } else if (evento.key === "Escape") {
    cerrarCuadroCrear();
  }
});

// Clic en el fondo oscuro (fuera del cuadro) también cancela
fondoCrear.addEventListener("click", function (evento) {
  if (evento.target === fondoCrear) {
    cerrarCuadroCrear();
  }
});

// ---------- Menú de tres puntos (⋯) de una canción (lo usan US11 y US12) ----------

const menuFila = document.getElementById("menu-fila");

// Muestra el menú debajo del botón ⋯. "opciones" es una lista de { texto, accion }.
function mostrarMenuFila(boton, opciones) {
  menuFila.innerHTML = "";
  opciones.forEach(function (opcion) {
    const item = document.createElement("button");
    item.className = "menu-fila-opcion";
    item.textContent = opcion.texto;
    item.addEventListener("click", function (evento) {
      // Frenamos el clic para que no cierre el menú antes de tiempo
      evento.stopPropagation();
      opcion.accion();
    });
    menuFila.appendChild(item);
  });

  menuFila.classList.remove("oculto");

  // Lo ubicamos pegado al botón, sin salirnos de la pantalla ni tapar la barra de abajo
  const caja = boton.getBoundingClientRect();
  const ancho = menuFila.offsetWidth;
  const alto = menuFila.offsetHeight;
  let izquierda = Math.max(8, caja.right - ancho);
  let arriba = caja.bottom + 4;
  if (arriba + alto > window.innerHeight - 100) {
    arriba = caja.top - alto - 4;
  }
  menuFila.style.left = izquierda + "px";
  menuFila.style.top = Math.max(8, arriba) + "px";
}

function cerrarMenuFila() {
  menuFila.classList.add("oculto");
}

// Se cierra al hacer clic en cualquier otro lado o al apretar Escape
document.addEventListener("click", function (evento) {
  const tocoElBoton = evento.target.closest(".btn-menu-fila");
  if (!tocoElBoton && !menuFila.contains(evento.target)) {
    cerrarMenuFila();
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    cerrarMenuFila();
  }
});
