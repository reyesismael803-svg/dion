# DION · cómo publicarlo en tu propio sitio (con imagen satelital)

Este paquete es EXACTAMENTE la misma DION que usas en Claude. No hay que cambiar nada ni pedirle nada a Gemini.
Fuera de Claude, el archivo `shim.js` reemplaza a Claude: guarda todo en tu navegador (IndexedDB) y usa tu clave de Gemini para la IA.

## Opción A · GitHub Pages (gratis, 10 minutos)
1. Crea una cuenta en github.com (si no tienes).
2. Botón **New repository** → nombre `dion` → Public → Create.
3. **Add file → Upload files** → arrastra TODO el contenido de esta carpeta `DION` (no la carpeta, su contenido) → Commit.
4. **Settings → Pages** → Source: "Deploy from a branch" → Branch: `main` / `(root)` → Save.
5. En 1–2 minutos tu DION estará en `https://TU-USUARIO.github.io/dion/`.

## Opción B · Firebase Hosting / Netlify
Netlify: entra a app.netlify.com/drop y arrastra la carpeta `DION`. Listo.

## Imagen satelital
Botón **SAT** (arriba a la derecha del planeta) y botón **Satélite** en la Mesa del terreno. Usa Esri World Imagery (gratis, con atribución). Dentro de Claude está bloqueada; aquí funciona.

## Tus datos
- Fuera de Claude los proyectos se guardan en ese navegador. Para pasarlos entre equipos usa **Taller (TLR) › Respaldo en archivo** y **Restaurar respaldo**.
- Para pasar tus proyectos de la versión de Claude a esta: en Claude haz *Respaldo en archivo*, y aquí *Restaurar respaldo*.

## IA (Gemini)
La primera vez que uses "Investigar con IA" te pedirá tu clave de Gemini (aistudio.google.com → Get API key). Se guarda solo en tu navegador.
