# Nuestra Música · Equipo 06 · Sprint 1

**Sprint Goal:** que el usuario pueda ver el catálogo de canciones, elegir una y escucharla, pudiendo pausarla y retomarla cuando quiera.

## Quién hace qué

| Persona  | US / Tarea                          | Archivos                                  | Cuándo subirlo |
|----------|-------------------------------------|-------------------------------------------|----------------|
| Milagros | Base del proyecto + TEST + planilla | `index.html`, `css/estilos.css`, `LEEME.md` | Iteración 0 (antes del miércoles 21/10) |
| Erika    | US01 Ver el catálogo (3 SP)         | `data/canciones.js`, `js/catalogo.js`, `musica/` | Jueves 22 – viernes 23 |
| Aixa     | US03 Reproducir: la lista           | `js/reproductor.js`                       | Sábado 24 – lunes 26 |
| Juan     | US03 Reproducir: la barra de abajo  | `js/barra.js`                             | Sábado 24 – lunes 26 |
| Jazmín   | US04 Pausar y reanudar (2 SP)       | `js/pausa.js`                             | Lunes 26 |

US03 vale 8 SP y pasa a DONE recién cuando la parte de Aixa y la de Juan funcionan juntas.

## Cómo probar la app en tu compu

1. Abrí la carpeta en **VS Code**.
2. Instalá la extensión **Live Server**.
3. Clic derecho en `index.html` → **Open with Live Server**.

## Cómo subir tu parte (GitHub Desktop)

1. **Fetch / Pull origin** (traer lo último).
2. **Current branch → New branch** → `us01-catalogo`, `us03-lista`, `us03-barra` o `us04-pausa`.
3. Copiá **solo tus archivos** a la carpeta del repo, probalos con Live Server y ajustá lo que haga falta.
4. Escribí un mensaje claro (ej: `US01: lista de canciones con portada`) → **Commit**.
5. **Push origin** → **Create Pull Request**.
6. Milagros (u otra persona) lo prueba con los escenarios y lo aprueba → **Merge**.

Nadie trabaja directo en `main`.

## Cómo probar cada US (escenarios)

- **US01:** se ve la lista con portada, nombre y artista. Con `const CANCIONES = [];` aparece "Todavía no hay canciones disponibles".
- **US03:** al pasar el mouse aparece el Play verde; al apretarlo la canción suena, se pinta de verde y la barra de abajo avanza. Si el mp3 no existe, aparece "No se pudo reproducir la canción" y la app sigue andando.
- **US04:** con la canción sonando, Pausa la detiene y la barra queda quieta. Play sigue desde el mismo segundo.

## Antes de entregar

Los mp3 de `musica/` son **tonos de prueba**. Reemplácenlos por canciones **libres de derechos** (Pixabay Music, Free Music Archive) y actualicen `data/canciones.js`. No suban música comercial.
