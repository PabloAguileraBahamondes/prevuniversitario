document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".temario-container")) return;

    document.querySelectorAll(".topic-card").forEach((tarjeta, indice) => {
        const tema = temarioM1[indice];
        if (!tema) return;
        tarjeta.dataset.temaId = tema.id;
        tarjeta.href = `temario.html?tema=${tema.id}`;
        tarjeta.addEventListener("click", (evento) => {
            evento.preventDefault();
            abrirTema(tema.id);
        });
    });

    const totalTemas = document.querySelector("#topic-count");
    if (totalTemas) totalTemas.textContent = temarioM1.length;

    const buscador = document.querySelector("#topic-search");
    if (buscador) {
        const tarjetas = [...document.querySelectorAll(".topic-card")];
        const contador = document.querySelector("#topic-search-count");
        const bloques = [...document.querySelectorAll(".temario-block")];
        buscador.addEventListener("input", () => {
            const consulta = buscador.value.trim().toLocaleLowerCase("es");
            let visibles = 0;
            tarjetas.forEach((tarjeta) => {
                const tema = temarioM1.find((item) => item.id === Number(tarjeta.dataset.temaId));
                const coincide = !consulta || `${tema.titulo} ${tema.nombreBloque} ${tema.contenidos.join(" ")}`.toLocaleLowerCase("es").includes(consulta);
                tarjeta.hidden = !coincide;
                if (coincide) visibles += 1;
            });
            bloques.forEach((bloque) => {
                bloque.hidden = !bloque.querySelector(".topic-card:not([hidden])");
            });
            if (contador) contador.textContent = consulta ? `${visibles} tema${visibles === 1 ? "" : "s"} encontrado${visibles === 1 ? "" : "s"}` : "Busca por tema o contenido";
        });
    }

    const idSolicitado = Number(new URLSearchParams(window.location.search).get("tema"));
    if (idSolicitado) abrirTema(idSolicitado);
});

const CLAVE_SUBTEMAS_DOMINADOS = "preuM1_subtemasDominados_v1";

function abrirTema(id) {
    const tema = obtenerTema(id);
    if (!tema) {
        console.error("No se encontró el tema solicitado:", id);
        return;
    }

    const dialogo = document.querySelector("#lesson-dialog") || crearDialogoLeccion();
    const contenidos = tema.contenidos.map((contenido) => `<li>${escaparHTML(contenido)}</li>`).join("");
    const preguntas = preguntasM1.filter((pregunta) => pregunta.temaId === tema.id);
    const numeroPregunta = preguntas.length ? preguntas[0].id : "";
    const dominados = obtenerSubtemasDominados();
    const lecciones = tema.lecciones.map((leccion, indice) => {
        const clave = `${tema.id}:${indice}`;
        const estaDominado = dominados.includes(clave);
        return `
            <article class="sublesson-card" id="sublesson-${indice}" data-sublesson="${escaparHTML(clave)}">
                <div class="sublesson-heading">
                    <span class="sublesson-number">${String(indice + 1).padStart(2, "0")}</span>
                    <h4>${escaparHTML(leccion.titulo)}</h4>
                </div>
                <p>${escaparHTML(leccion.idea)}</p>
                <div class="sublesson-example"><strong>Ejemplo:</strong> ${escaparHTML(leccion.ejemplo)}</div>
                <div class="sublesson-solution"><strong>Desarrollo:</strong> ${escaparHTML(leccion.solucion)}</div>
                <button class="sublesson-master${estaDominado ? " is-mastered" : ""}" type="button" data-sublesson-toggle="${escaparHTML(clave)}" aria-pressed="${estaDominado}">
                    <span aria-hidden="true">${estaDominado ? "✓" : "○"}</span>
                    <span>${estaDominado ? "Lo domino" : "Marcar como dominado"}</span>
                </button>
            </article>`;
    }).join("");
    const dominadosEnTema = tema.lecciones.reduce((total, leccion, indice) =>
        total + (dominados.includes(`${tema.id}:${indice}`) ? 1 : 0), 0);

    dialogo.innerHTML = `
        <div class="lesson-dialog-head">
            <div><span class="eyebrow">${escaparHTML(tema.nombreBloque)} · TEMA ${String(tema.id).padStart(2, "0")}</span><h2>${escaparHTML(tema.titulo)}</h2></div>
            <button class="icon-button" type="button" aria-label="Cerrar lección" data-close>×</button>
        </div>
        <div class="lesson-video">
            <span class="pill">TUTOR NARRADO · PIZARRA DE ESTUDIO</span>
            <div class="lesson-scene" id="lesson-scene" data-scene="0" data-topic="${tema.id}">
                <div class="narration-progress">
                    <span id="narration-progress-label">Clase completa · ${tema.lecciones.length + 2} segmentos</span>
                    <div class="narration-track" role="progressbar" aria-label="Avance de la narración" aria-valuemin="0" aria-valuemax="${tema.lecciones.length + 2}" aria-valuenow="0">
                        <span id="narration-progress-fill"></span>
                    </div>
                </div>
                <div class="scene-grid">
                    <div class="scene-visual" aria-hidden="true">
                        <span class="scene-orbit orbit-one"></span><span class="scene-orbit orbit-two"></span>
                        <span class="scene-symbol">M1</span>
                        <span class="scene-axis axis-x"></span><span class="scene-axis axis-y"></span>
                    </div>
                    <div class="scene-board">
                        <span class="scene-kicker" id="scene-kicker">IDEA CLAVE</span>
                        <div class="board-equation" id="board-equation">${escaparHTML(tema.titulo)}</div>
                        <p class="lesson-caption" id="lesson-caption">${escaparHTML(tema.idea)}</p>
                    </div>
                </div>
            </div>
            <p id="narration-status" aria-live="polite">Lee la explicación o escucha la clase usando la voz disponible en tu navegador.</p>
            <div class="lesson-actions">
                <button class="button button-primary" type="button" id="speak-lesson">▶ Escuchar explicación</button>
                <button class="button button-quiet" type="button" id="stop-lesson">■ Detener</button>
            </div>
        </div>
        <div class="lesson-content">
            <section><h3>La idea clave</h3><p>${escaparHTML(tema.idea)}</p></section>
            <section><h3>Temas que revisarás</h3><ul>${contenidos}</ul></section>
            <section class="example-box"><h3>Ejemplo resuelto</h3><p><strong>${escaparHTML(tema.ejemplo)}</strong></p><p>${escaparHTML(tema.solucion)}</p></section>
            <section class="sublesson-route" aria-labelledby="sublesson-route-title">
                <div class="sublesson-route-head">
                    <div><span class="eyebrow">RUTA M1 · TEMA ${String(tema.id).padStart(2, "0")}</span><h3 id="sublesson-route-title">Cada contenido, paso a paso</h3></div>
                    <span class="mastery-count" id="mastery-count">${dominadosEnTema}/${tema.lecciones.length} dominados</span>
                </div>
                <div class="mastery-track" role="progressbar" aria-label="Contenidos dominados en este tema" aria-valuemin="0" aria-valuemax="${tema.lecciones.length}" aria-valuenow="${dominadosEnTema}">
                    <span id="mastery-fill" style="width:${Math.round(dominadosEnTema / tema.lecciones.length * 100)}%"></span>
                </div>
                <p class="sublesson-intro">Estudia la idea, sigue el ejemplo resuelto y marca cada punto cuando ya puedas explicarlo por tu cuenta.</p>
                <div class="sublesson-list">${lecciones}</div>
            </section>
            <section class="warning-box"><h3>Ojo con este error</h3><p>${escaparHTML(tema.error)}</p></section>
        </div>
        <div class="lesson-dialog-foot">
            <span class="muted">Explicaciones y ejemplos originales alineados al temario PAES M1; no son preguntas oficiales DEMRE.</span>
            <a class="button button-primary" href="practica.html?pregunta=${encodeURIComponent(numeroPregunta)}">Practicar este tema →</a>
        </div>`;

    if (!dialogo.open) dialogo.showModal();
    dialogo.querySelector("[data-close]").addEventListener("click", () => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        dialogo.close();
    });
    dialogo.addEventListener("click", (evento) => {
        if (evento.target === dialogo && "speechSynthesis" in window) window.speechSynthesis.cancel();
    }, { once: true });
    dialogo.oncancel = () => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };

    dialogo.querySelector(".sublesson-list").addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-sublesson-toggle]");
        if (!boton) return;
        const clave = boton.dataset.sublessonToggle;
        const actualizados = obtenerSubtemasDominados();
        const yaDominado = actualizados.includes(clave);
        const nuevos = yaDominado
            ? actualizados.filter((elemento) => elemento !== clave)
            : [...actualizados, clave];
        localStorage.setItem(CLAVE_SUBTEMAS_DOMINADOS, JSON.stringify(nuevos));
        const cuenta = nuevos.filter((elemento) => elemento.startsWith(`${tema.id}:`)).length;
        boton.classList.toggle("is-mastered", !yaDominado);
        boton.setAttribute("aria-pressed", String(!yaDominado));
        boton.innerHTML = `<span aria-hidden="true">${yaDominado ? "○" : "✓"}</span><span>${yaDominado ? "Marcar como dominado" : "Lo domino"}</span>`;
        dialogo.querySelector("#mastery-count").textContent = `${cuenta}/${tema.lecciones.length} dominados`;
        const barra = dialogo.querySelector(".mastery-track");
        barra.setAttribute("aria-valuenow", String(cuenta));
        dialogo.querySelector("#mastery-fill").style.width = `${Math.round(cuenta / tema.lecciones.length * 100)}%`;
    });

    dialogo.querySelector("#speak-lesson").addEventListener("click", () => narrarLeccion(tema, dialogo));
    dialogo.querySelector("#stop-lesson").addEventListener("click", () => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        dialogo.querySelector("#narration-status").textContent = "Narración detenida. Puedes volver a reproducirla cuando quieras.";
    });
}

function narrarLeccion(tema, dialogo) {
    const estado = dialogo.querySelector("#narration-status");
    const pizarra = dialogo.querySelector("#board-equation");
    const escena = dialogo.querySelector("#lesson-scene");
    const subtitulo = dialogo.querySelector("#lesson-caption");
    if (!("speechSynthesis" in window)) {
        estado.textContent = "Este navegador no ofrece narración de voz. Puedes estudiar con la explicación escrita de esta lección.";
        return;
    }

    window.speechSynthesis.cancel();
    const etapas = [
        { titulo: "Idea clave", texto: tema.idea, pizarra: tema.titulo },
        ...tema.lecciones.map((leccion, indice) => ({
            titulo: `Subtema ${indice + 1} de ${tema.lecciones.length}: ${leccion.titulo}`,
            texto: `${leccion.idea} Ejemplo: ${leccion.ejemplo} Desarrollo: ${leccion.solucion}`,
            pizarra: leccion.ejemplo,
            subtema: indice
        })),
        { titulo: "Error frecuente", texto: tema.error, pizarra: tema.error }
    ];

    let indice = 0;
    const reproducirSiguiente = () => {
        if (indice >= etapas.length) {
            estado.textContent = "Fin de la clase completa. Repasa los puntos marcados y continúa con la práctica.";
            escena.classList.remove("scene-playing");
            return;
        }
        const indiceActual = indice;
        const etapa = etapas[indiceActual];
        const narracion = new SpeechSynthesisUtterance(etapa.texto);
        narracion.lang = "es-CL";
        narracion.rate = 0.92;
        narracion.onstart = () => {
            pizarra.textContent = etapa.pizarra;
            subtitulo.textContent = etapa.texto;
            dialogo.querySelector("#scene-kicker").textContent = etapa.titulo.toLocaleUpperCase("es");
            estado.textContent = `Segmento ${indiceActual + 1} de ${etapas.length}: ${etapa.titulo}.`;
            escena.dataset.scene = String(indiceActual);
            escena.dataset.topic = String(tema.id);
            const avance = escena.querySelector(".narration-track");
            avance.setAttribute("aria-valuenow", String(indiceActual + 1));
            escena.querySelector("#narration-progress-label").textContent = `Segmento ${indiceActual + 1} / ${etapas.length}`;
            escena.querySelector("#narration-progress-fill").style.width = `${Math.round((indiceActual + 1) / etapas.length * 100)}%`;
            dialogo.querySelectorAll(".sublesson-card.is-reading").forEach((tarjeta) => tarjeta.classList.remove("is-reading"));
            if (etapa.subtema !== undefined) {
                const tarjeta = dialogo.querySelector(`#sublesson-${etapa.subtema}`);
                tarjeta.classList.add("is-reading");
                tarjeta.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                dialogo.querySelector(".sublesson-card.is-reading")?.classList.remove("is-reading");
            }
            escena.classList.remove("scene-playing");
            void escena.offsetWidth;
            escena.classList.add("scene-playing");
        };
        narracion.onend = () => {
            if (indice !== indiceActual) return;
            indice += 1;
            reproducirSiguiente();
        };
        narracion.onerror = (evento) => {
            if (evento.error === "canceled" || evento.error === "interrupted") return;
            estado.textContent = `La voz se detuvo en el segmento ${indiceActual + 1}. Puedes volver a iniciarla o seguir leyendo.`;
        };
        window.speechSynthesis.speak(narracion);
    };

    dialogo.querySelector("#stop-lesson").onclick = () => {
        window.speechSynthesis.cancel();
        escena.classList.remove("scene-playing");
        dialogo.querySelector(".sublesson-card.is-reading")?.classList.remove("is-reading");
        estado.textContent = "Narración detenida. Puedes volver a reproducirla cuando quieras.";
    };
    reproducirSiguiente();
}

function obtenerSubtemasDominados() {
    const guardado = localStorage.getItem(CLAVE_SUBTEMAS_DOMINADOS);
    if (!guardado) return [];
    try {
        const datos = JSON.parse(guardado);
        if (!Array.isArray(datos) || datos.some((elemento) => typeof elemento !== "string")) {
            throw new TypeError("El registro de subtemas debe ser una lista de identificadores.");
        }
        return datos;
    } catch (error) {
        console.error("No se pudo leer el registro de subtemas dominados.", error);
        return [];
    }
}

function crearDialogoLeccion() {
    const dialogo = document.createElement("dialog");
    dialogo.id = "lesson-dialog";
    dialogo.className = "lesson-dialog";
    document.body.append(dialogo);
    return dialogo;
}

function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, (caracter) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[caracter]);
}