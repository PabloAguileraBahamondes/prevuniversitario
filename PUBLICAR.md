# Publicar PREU M1 en GitHub Pages

La web es estática, así que GitHub Pages puede publicarla sin servidor propio ni claves de API. El flujo de GitHub Actions está preparado en `.github/workflows/pages.yml`.

## 1. Crear un repositorio público vacío

En GitHub, crea un repositorio llamado `preu-m1` y selecciona **Public**. No marques las opciones para crear un README, `.gitignore` ni licencia: así quedará vacío y podrás subir el proyecto sin conflictos.

## 2. Subir los archivos del sitio

Abre PowerShell en la carpeta `Prevuniversitario` y ejecuta estos comandos. Reemplaza `TU_USUARIO` por tu nombre de usuario de GitHub:

```powershell
git init -b main
git add .github/workflows/pages.yml index.html temario.html practica.html simulador.html progreso.html css js data
git commit -m "Preparar PREU M1 para GitHub Pages"
git remote add origin https://github.com/TU_USUARIO/preu-m1.git
git push -u origin main
```

Solo se suben el sitio y su flujo de publicación; los archivos del servidor local para Windows no se agregan a ese repositorio.

## 3. Activar Pages

En el repositorio de GitHub, abre **Settings → Pages**. En **Build and deployment**, elige **GitHub Actions** como fuente. Luego abre la pestaña **Actions** y espera a que termine el flujo **Publicar PREU M1 en GitHub Pages**.

La dirección tendrá este formato:

```text
https://TU_USUARIO.github.io/preu-m1/
```

Los cambios que subas después a la rama `main` se publicarán automáticamente. Como el repositorio es público, el código del sitio también será visible para cualquiera; no agregues datos personales ni claves privadas.
