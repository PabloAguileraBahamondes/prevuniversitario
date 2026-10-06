document.addEventListener("DOMContentLoaded", iniciarSimulador);

function iniciarSimulador() {
    const start = document.querySelector("#start-simulator");
    const intro = document.querySelector("#simulator-intro");
    const stage = document.querySelector("#simulator-stage");
    const results = document.querySelector("#simulator-results");
    if (!start || !stage) return;

    const DURACION_SEGUNDOS = 45 * 60;
    let preguntas = [];
    let respuestas = {};
    let indice = 0;
    let restante = DURACION_SEGUNDOS;
    let reloj;

    start.addEventListener("click", comenzar);

    function comenzar() {
        preguntas = mezclar([...preguntasM1]);
        respuestas = {};
        indice = 0;
        restante = DURACION_SEGUNDOS;
        intro.classList.add("hidden");
        results.classList.add("hidden");
        stage.classList.remove("hidden");
        pintarPregunta();
        reloj = window.setInterval(() => {
            restante -= 1;
            const display = stage.querySelector("#simulator-clock");
            if (display) display.textContent = formatearTiempo(restante);
            if (restante <= 0) finalizar();
        }, 1000);
    }

    function pintarPregunta() {
        stage.replaceChildren();
        const pregunta = preguntas[indice];
        const tema = obtenerTema(pregunta.temaId);
        const topbar = document.createElement("div");
        topbar.className = "simulator-topbar";
        topbar.innerHTML = `<span class="pill">SIMULACRO M1 · ${preguntas.length} PREGUNTAS</span><strong class="simulator-clock" id="simulator-clock">${formatearTiempo(restante)}</strong>`;
        stage.append(topbar);

        const progreso = document.createElement("div");
        progreso.className = "simulator-progress";
        const relleno = document.createElement("span");
        relleno.style.width = `${((indice + 1) / preguntas.length) * 100}%`;
        progreso.append(relleno);
        stage.append(progreso);

        const contenido = document.createElement("div");
        contenido.className = "simulator-question";
        const meta = document.createElement("p");
        meta.className = "question-topic";
        meta.textContent = `Pregunta ${indice + 1} de ${preguntas.length} · ${tema.nombreBloque}`;
        const titulo = document.createElement("h2");
        titulo.textContent = pregunta.enunciado;
        contenido.append(meta, titulo);

        const opciones = document.createElement("div");
        opciones.className = "answer-options";
        pregunta.alternativas.forEach((alternativa, opcion) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "answer-option";
            if (respuestas[pregunta.id] === opcion) boton.classList.add("is-selected");
            const letra = document.createElement("span");
            letra.className = "option-letter";
            letra.textContent = String.fromCharCode(65 + opcion);
            const texto = document.createElement("span");
            texto.textContent = alternativa;
            boton.append(letra, texto);
            boton.addEventListener("click", () => {
                respuestas[pregunta.id] = opcion;
                pintarPregunta();
            });
            opciones.append(boton);
        });
        contenido.append(opciones);
        stage.append(contenido);

        const pie = document.createElement("div");
        pie.className = "simulator-footer";
        const anterior = crearBoton("← Anterior", "button button-quiet", () => {
            if (indice > 0) {
                indice -= 1;
                pintarPregunta();
            }
        });
        anterior.disabled = indice === 0;
        const marcadas = document.createElement("span");
        marcadas.className = "muted";
        marcadas.textContent = `${Object.keys(respuestas).length} de ${preguntas.length} respondidas`;
        const siguiente = crearBoton(indice === preguntas.length - 1 ? "Finalizar simulacro" : "Siguiente →", "button button-primary", () => {
            if (indice === preguntas.length - 1) finalizar();
            else {
                indice += 1;
                pintarPregunta();
            }
        });
        pie.append(anterior, marcadas, siguiente);
        stage.append(pie);

        const navegacion = document.createElement("div");
        navegacion.className = "question-map";
        preguntas.forEach((item, posicion) => {
            const boton = crearBoton(String(posicion + 1), `map-number ${respuestas[item.id] !== undefined ? "answered" : ""} ${posicion === indice ? "current" : ""}`, () => {
                indice = posicion;
                pintarPregunta();
            });
            boton.setAttribute("aria-label", `Ir a pregunta ${posicion + 1}`);
            navegacion.append(boton);
        });
        stage.append(navegacion);
    }

    function finalizar() {
        window.clearInterval(reloj);
        let correctas = 0;
        preguntas.forEach((pregunta) => {
            const acierto = respuestas[pregunta.id] === pregunta.correcta;
            if (acierto) correctas += 1;
            registrarRespuesta(acierto, pregunta);
        });
        stage.classList.add("hidden");
        results.classList.remove("hidden");
        const pct = Math.round(correctas / preguntas.length * 100);
        results.replaceChildren();

        const cabecera = document.createElement("div");
        cabecera.className = "result-heading";
        const etiqueta = document.createElement("span");
        etiqueta.className = "eyebrow";
        etiqueta.textContent = "SIMULACRO TERMINADO";
        const titulo = document.createElement("h2");
        titulo.textContent = `${correctas} de ${preguntas.length} correctas`;
        const detalle = document.createElement("p");
        detalle.textContent = `${pct}% de precisión · Las preguntas sin responder se contabilizan como incorrectas.`;
        cabecera.append(etiqueta, titulo, detalle);
        results.append(cabecera);

        const lista = document.createElement("div");
        lista.className = "results-review";
        preguntas.forEach((pregunta, posicion) => {
            const fila = document.createElement("article");
            fila.className = `result-review-item ${respuestas[pregunta.id] === pregunta.correcta ? "review-correct" : "review-wrong"}`;
            const nombreTema = obtenerTema(pregunta.temaId).titulo;
            const h3 = document.createElement("h3");
            h3.textContent = `${posicion + 1}. ${nombreTema} — ${respuestas[pregunta.id] === pregunta.correcta ? "Correcta" : "Para revisar"}`;
            const texto = document.createElement("p");
            texto.textContent = pregunta.enunciado;
            const explicacion = document.createElement("p");
            explicacion.textContent = pregunta.explicacion;
            fila.append(h3, texto, explicacion);
            lista.append(fila);
        });
        results.append(lista);

        const repetir = crearBoton("Intentar nuevamente", "button button-primary", comenzar);
        results.append(repetir);
    }

    function crearBoton(texto, clases, accion) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = clases;
        boton.textContent = texto;
        boton.addEventListener("click", accion);
        return boton;
    }

    function formatearTiempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const resto = segundos % 60;
        return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
    }

    function mezclar(elementos) {
        for (let i = elementos.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
        }
        return elementos;
    }
}