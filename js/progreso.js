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
    actualizarRango(progreso.preguntasRespondidas);
    actualizarMisiones(progreso, porcentaje);
    actualizarRecomendacion(progreso);

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
        if (!confirm("¿Quieres borrar tus respuestas, rangos y avances guardados en este navegador?")) return;
        localStorage.removeItem(CLAVE_PROGRESO);
        localStorage.removeItem("preuM1_rotacionTemas_v1");
        localStorage.removeItem("preuM1_ejemplosRecientes_v1");
        localStorage.removeItem("preuM1_subtemasDominados_v1");
        window.location.reload();
    });
}

function actualizarRango(respondidas) {
    const rangos = [
        { nombre: "Aspirante M1", siguiente: "Explorador", minimo: 0, maximo: 10 },
        { nombre: "Explorador M1", siguiente: "Estratega", minimo: 10, maximo: 30 },
        { nombre: "Estratega M1", siguiente: "Maestro PAES", minimo: 30, maximo: 64 },
        { nombre: "Maestro PAES", siguiente: null, minimo: 64, maximo: 64 }
    ];
    const rango = rangos.find((item) => respondidas < item.maximo) || rangos[rangos.length - 1];
    const dentroDelRango = Math.max(0, respondidas - rango.minimo);
    const progreso = rango.maximo > rango.minimo
        ? Math.min(100, Math.round(dentroDelRango / (rango.maximo - rango.minimo) * 100))
        : 100;
    document.querySelector("#mission-rank").textContent = rango.nombre;
    document.querySelector("#mission-rank-copy").textContent = rango.siguiente
        ? `${dentroDelRango} de ${rango.maximo - rango.minimo} respuestas para alcanzar el siguiente rango.`
        : "Has completado la campaña de rangos. Sigue entrenando para mantener tu nivel.";
    document.querySelector("#mission-rank-next").textContent = rango.siguiente
        ? `Siguiente rango · ${rango.siguiente}`
        : "Rango máximo desbloqueado";
    document.querySelector("#mission-rank-fill").style.width = `${progreso}%`;
    document.querySelector(".mission-rank-track").setAttribute("aria-valuenow", String(progreso));
}

function actualizarMisiones(progreso, porcentaje) {
    const ejesVisitados = new Set();
    for (let bloque = 1; bloque <= 7; bloque += 1) {
        if (obtenerTemasPorBloque(bloque).some((tema) =>
            (progreso.porTema[String(tema.id)]?.respondidas || 0) > 0
        )) ejesVisitados.add(bloque);
    }
    const insignias = [
        { icono: "🚀", nombre: "Primer despegue", detalle: "Responde tu primera pregunta.", obtenida: progreso.preguntasRespondidas >= 1 },
        { icono: "🔟", nombre: "En movimiento", detalle: "Resuelve 10 preguntas.", obtenida: progreso.preguntasRespondidas >= 10 },
        { icono: "🧭", nombre: "Explorador de ejes", detalle: "Practica en los siete ejes.", obtenida: ejesVisitados.size === 7 },
        { icono: "🎯", nombre: "Pulso preciso", detalle: "Alcanza 80% en 10 o más respuestas.", obtenida: progreso.preguntasRespondidas >= 10 && porcentaje >= 80 },
        { icono: "🏅", nombre: "Maestro de campaña", detalle: "Acumula 64 respuestas.", obtenida: progreso.preguntasRespondidas >= 64 }
    ];
    const contenedor = document.querySelector("#achievement-grid");
    insignias.forEach((insignia) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = `achievement-card${insignia.obtenida ? " is-unlocked" : ""}`;
        const icono = document.createElement("span");
        icono.className = "achievement-icon";
        icono.textContent = insignia.icono;
        const titulo = document.createElement("strong");
        titulo.textContent = insignia.nombre;
        const detalle = document.createElement("small");
        detalle.textContent = insignia.detalle;
        const estado = document.createElement("span");
        estado.className = "achievement-state";
        estado.textContent = insignia.obtenida ? "DESBLOQUEADA" : "POR DESBLOQUEAR";
        tarjeta.append(icono, titulo, detalle, estado);
        contenedor.append(tarjeta);
    });
}

function actualizarRecomendacion(progreso) {
    const titulo = document.querySelector("#recommendation-title");
    const texto = document.querySelector("#recommendation-copy");
    const enlace = document.querySelector("#recommendation-link");
    const temasPracticados = temarioM1
        .map((tema) => ({
            tema,
            estadistica: progreso.porTema[String(tema.id)]
        }))
        .filter((item) => item.estadistica && item.estadistica.respondidas > 0);
    if (!temasPracticados.length) {
        titulo.textContent = "Tu mapa está esperando la primera señal";
        texto.textContent = "Parte con la ruta rotativa: diez preguntas, diez temas y un recorrido que se adapta entre sesiones.";
        enlace.href = "practica.html?modo=10";
        enlace.textContent = "Iniciar primera misión →";
        return;
    }
    const porReforzar = temasPracticados.sort((a, b) =>
        a.estadistica.correctas / a.estadistica.respondidas -
        b.estadistica.correctas / b.estadistica.respondidas
    )[0];
    const acierto = Math.round(porReforzar.estadistica.correctas / porReforzar.estadistica.respondidas * 100);
    titulo.textContent = `Siguiente parada: ${porReforzar.tema.titulo}`;
    texto.textContent = `Tu precisión en este tema es ${acierto}%. Repasa sus ejemplos y vuelve a intentarlo para consolidarlo.`;
    enlace.href = `temario.html?tema=${porReforzar.tema.id}`;
    enlace.textContent = "Repasar este tema →";
}