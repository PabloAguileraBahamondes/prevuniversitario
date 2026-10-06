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

    dialogo.innerHTML = `
        <div class="lesson-dialog-head">
            <div><span class="eyebrow">${escaparHTML(tema.nombreBloque)} · TEMA ${String(tema.id).padStart(2, "0")}</span><h2>${escaparHTML(tema.titulo)}</h2></div>
            <button class="icon-button" type="button" aria-label="Cerrar lección" data-close>×</button>
        </div>
        <div class="lesson-video">
            <span class="pill">TUTOR NARRADO · PIZARRA DE ESTUDIO</span>
            <div class="lesson-scene" id="lesson-scene" data-scene="0" data-topic="${tema.id}">
                <div class="scene-steps" aria-label="Etapas de la clase">
                    <span class="scene-step active">01 · Idea</span>
                    <span class="scene-step">02 · Ejemplo</span>
                    <span class="scene-step">03 · Resolución</span>
                    <span class="scene-step">04 · Atención</span>
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
            <section class="warning-box"><h3>Ojo con este error</h3><p>${escaparHTML(tema.error)}</p></section>
        </div>
        <div class="lesson-dialog-foot">
            <span class="muted">Explicación pedagógica original alineada al temario M1.</span>
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
    let detenida = false;
    const etapas = [
        { titulo: "Idea clave", texto: tema.idea, pizarra: tema.titulo },
        { titulo: "Ejemplo", texto: tema.ejemplo, pizarra: tema.ejemplo },
        { titulo: "Resolución paso a paso", texto: tema.solucion, pizarra: tema.solucion },
        { titulo: "Error frecuente", texto: tema.error, pizarra: tema.error }
    ];

    etapas.forEach((etapa, indice) => {
        const narracion = new SpeechSynthesisUtterance(etapa.texto);
        narracion.lang = "es-CL";
        narracion.rate = 0.92;
        narracion.onstart = () => {
            pizarra.textContent = etapa.pizarra;
            subtitulo.textContent = etapa.texto;
            dialogo.querySelector("#scene-kicker").textContent = etapa.titulo.toLocaleUpperCase("es");
            estado.textContent = `${etapa.titulo}: sigue la explicación en la pizarra.`;
            escena.dataset.scene = String(indice);
            escena.dataset.topic = String(tema.id);
            escena.querySelectorAll(".scene-step").forEach((paso, pasoIndice) => {
                paso.classList.toggle("active", pasoIndice === indice);
                paso.classList.toggle("complete", pasoIndice < indice);
            });
            escena.classList.remove("scene-playing");
            void escena.offsetWidth;
            escena.classList.add("scene-playing");
        };
        narracion.onend = () => {
            if (indice === etapas.length - 1 && !detenida) {
                estado.textContent = "Fin de la explicación. Repasa el ejemplo o responde una pregunta de práctica.";
            }
        };
        narracion.onerror = (evento) => {
            if (evento.error === "canceled" || evento.error === "interrupted") return;
            if (!detenida) estado.textContent = "No se pudo iniciar la voz. Prueba con otro navegador o continúa leyendo la explicación.";
        };
        window.speechSynthesis.speak(narracion);
    });
    dialogo.querySelector("#stop-lesson").onclick = () => {
        detenida = true;
        window.speechSynthesis.cancel();
        escena.classList.remove("scene-playing");
        estado.textContent = "Narración detenida. Puedes volver a reproducirla cuando quieras.";
    };
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