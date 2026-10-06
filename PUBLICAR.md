# Publicar PREU M1 en GitHub Pages

PREU M1 es un sitio estático de HTML, CSS y JavaScript. La forma más sencilla de publicarlo es desde la rama `main`, sin compilar el sitio ni mantener un flujo adicional de GitHub Actions.

## Activar la publicación

1. Abre **Settings → Pages** en el repositorio.
2. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
3. En **Branch**, selecciona `main` y la carpeta `/(root)`.
4. Pulsa **Save** y espera unos minutos.

La dirección de este repositorio es:

```text
https://pabloaguilerabahamondes.github.io/prevuniversitario/
```

Los cambios que subas a `main` se publicarán automáticamente. Como el repositorio es público, el código del sitio también será visible para cualquiera; no agregues datos personales ni claves privadas.
