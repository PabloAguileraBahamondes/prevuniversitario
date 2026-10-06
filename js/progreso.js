document.addEventListener("DOMContentLoaded", mostrarProgreso);

function mostrarProgreso() {
    if (!document.querySelector("#axis-progress")) return;
    const progreso = obtenerProgreso();

    document.querySelector("#progress-answered").textContent = progreso.preguntasRespondidas;
    document.querySelector("#progress-correct").textContent = progreso.respuestasCorrectas;
    const porcentaje = progreso.preguntasRespondidas
        ? Math.round(progreso.respuestasCorrectas / progreso.preguntasRespondidas * 100)
        : 0;
    document.querySelector("#progress-accuracy").textContent = `${porcentaje}%`;
    document.querySelector("#progress-streak").textContent = `${progreso.racha} días`;

    const ejes = [
        "Números", "Porcentaje", "Potencias y raíces", "Álgebra",
        "Funciones", "Geometría", "Probabilidad y estadística"
    ];
    const lista = document.querySelector("#axis-progress");
    ejes.forEach((nombre, indice) => {
        const bloque = indice + 1;
        const temas = obtenerTemasPorBloque(bloque);
        const intentos = temas.reduce((suma, tema) => suma + (progreso.porTema[String(tema.id)]?.respondidas || 0), 0);
        const aciertos = temas.reduce((suma, tema) => suma + (progreso.porTema[String(tema.id)]?.correctas || 0), 0);
        const avance = Math.round(temas.filter((tema) => progreso.temasCompletados.includes(tema.id)).length / temas.length * 100);
        const precisionEje = intentos ? Math.round(aciertos / intentos * 100) : 0;

        const fila = document.createElement("article");
        fila.className = "axis-progress-row";
        const encabezado = document.createElement("div");
        encabezado.className = "axis-progress-heading";
        const titulo = document.createElement("strong");
        titulo.textContent = nombre;
        const cuenta = document.createElement("span");
        cuenta.textContent = `${temas.filter((tema) => progreso.temasCompletados.includes(tema.id)).length}/${temas.length} temas · ${intentos} preguntas · ${precisionEje}% precisión`;
        encabezado.append(titulo, cuenta);
        const barra = document.createElement("div");
        barra.className = "axis-bar";
        const relleno = document.createElement("span");
        relleno.style.width = `${avance}%`;
        barra.append(relleno);
        fila.append(encabezado, barra);
        lista.append(fila);
    });

    const erroresTema = new Map();
    progreso.errores.forEach((error) => {
        if (error.temaId) erroresTema.set(error.temaId, (erroresTema.get(error.temaId) || 0) + 1);
    });
    const revision = document.querySelector("#review-list");
    const ordenados = [...erroresTema.entries()].sort((a, b) => b[1] - a[1]);
    if (ordenados.length === 0) {
        const vacio = document.createElement("p");
        vacio.className = "muted";
        vacio.textContent = "Todavía no hay errores guardados. Al practicar, aquí aparecerán los temas que conviene reforzar.";
        revision.append(vacio);
    } else {
        ordenados.slice(0, 5).forEach(([id, cantidad]) => {
            const tema = obtenerTema(id);
            if (!tema) return;
            const enlace = document.createElement("a");
            enlace.className = "review-link";
            enlace.href = `temario.html?tema=${tema.id}`;
            const nombre = document.createElement("span");
            nombre.textContent = `${tema.nombreBloque} · ${tema.titulo}`;
            const ocurrencias = document.createElement("strong");
            ocurrencias.textContent = `${cantidad} error${cantidad === 1 ? "" : "es"} →`;
            enlace.append(nombre, ocurrencias);
            revision.append(enlace);
        });
    }

    document.querySelector("#clear-progress").addEventListener("click", () => {
        if (!confirm("¿Quieres borrar todas tus respuestas y el progreso guardado en este navegador?")) return;
        localStorage.removeItem(CLAVE_PROGRESO);
        window.location.reload();
    });
}