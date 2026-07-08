# 💛 Para la pequeña Ari

Paginita de apoyo para Ariana antes de su examen final.

## Cómo cambiar la hora del examen

Abre `script.js` y edita la primera línea del bloque `CONFIG`:

```js
examDate: "2026-07-08T15:00:00",
```

Formato: `AAAA-MM-DDTHH:MM:SS` (hora local). Ahí mismo puedes cambiar apodos, mensajes y razones.

## Cómo publicarla en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público), p. ej. `animo-ari`.
2. Sube estos 3 archivos: `index.html`, `styles.css`, `script.js` (y este README si quieres). Puedes arrastrarlos directo en la web de GitHub con "Add file → Upload files".
3. Ve a **Settings → Pages**.
4. En "Source" elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
5. En 1-2 minutos tu página estará en `https://TU_USUARIO.github.io/animo-ari/`.

Cada vez que edites `script.js` en GitHub, la página se actualiza sola en un par de minutos.
