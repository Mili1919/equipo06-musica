// US07 - Moverme por la app con el menú lateral - Milagros
// Escenario 1: hago clic en Inicio, Buscar, Tu biblioteca o Mi cuenta -> se abre esa pantalla
//              y la opción queda resaltada en el menú.
// Escenario 2: no inicié sesión -> hago clic en Mi cuenta -> veo que puedo iniciar sesión o crear una cuenta.

// Muestra la pantalla que le pasamos y esconde las demás
function mostrarPantalla(nombre) {
  const pantallas = document.querySelectorAll(".pantalla");
  pantallas.forEach(function (pantalla) {
    pantalla.classList.add("oculto");
  });
  document.getElementById("pantalla-" + nombre).classList.remove("oculto");

  // Si la pantalla está en el menú, la resaltamos
  const opcion = document.querySelector('.menu-opcion[data-pantalla="' + nombre + '"]');
  if (opcion) {
    document.querySelectorAll(".menu-opcion").forEach(function (otra) {
      otra.classList.remove("activa");
    });
    opcion.classList.add("activa");
  }
}

// Clic en las opciones del menú y en los botones "Volver"
const botonesPantalla = document.querySelectorAll(".menu-opcion, .btn-volver");
botonesPantalla.forEach(function (boton) {
  boton.addEventListener("click", function () {
    mostrarPantalla(boton.dataset.pantalla);
  });
});

// Mi cuenta: iniciar sesión y crear cuenta se hacen más adelante (Release 2)
document.getElementById("btn-iniciar-sesion").addEventListener("click", function () {
  mostrarAviso("Iniciar sesión va a estar disponible próximamente");
});
document.getElementById("btn-crear-cuenta").addEventListener("click", function () {
  mostrarAviso("Crear cuenta va a estar disponible próximamente");
});
