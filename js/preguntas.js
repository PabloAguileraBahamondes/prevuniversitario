document.addEventListener("DOMContentLoaded", iniciarPractica);

const CLAVE_ROTACION_PRACTICA = "preuM1_rotacionTemas_v1";

function iniciarPractica() {
    const area = document.querySelector("#practice-area");
    if (!area) return;

    const filtro = document.querySelector("#practice-block");
    const total = document.querySelector("#practice-count");
    let cola = [];
    let indice = 0;
    let respondidas = 0;
    let correctas = 0;
    let modoActual = "ruta";
    let preguntasBaseActuales = [];

    const preguntaSolicitada = new URLSearchParams(window.location.search).get("pregunta");
    if (preguntaSolicitada) {
        const encontrada = preguntasM1.find((pregunta) => pregunta.id === preguntaSolicitada);
        if (encontrada) {
            filtro.value = String(encontrada.bloque);
            iniciar([encontrada], "pregunta");
        }
    }

    filtro.addEventListener("change", actualizarCantidad);
    document.querySelector("#start-practice").addEventListener("click", iniciarRutaRotativa);
    document.querySelector("#start-full-practice").addEventListener("click", () => iniciar([...preguntasM1], "ensayo"));
    actualizarCantidad();

    const modoSolicitado = new URLSearchParams(window.location.search).get("modo");
    if (!preguntaSolicitada && modoSolicitado === "64") iniciar([...preguntasM1], "ensayo");
    else if (!preguntaSolicitada && modoSolicitado === "10") iniciarRutaRotativa();

    function obtenerSeleccion() {
        const bloque = Number(filtro.value);
        return bloque ? obtenerPreguntasPorBloque(bloque) : [...preguntasM1];
    }

    function actualizarCantidad() {
        const cantidad = obtenerSeleccion().length;
        total.textContent = `${preguntasM1.length} preguntas disponibles · ${cantidad} en el eje seleccionado`;
        const rutaMaxima = Math.min(10, cantidad);
        const tieneFiltro = Number(filtro.value) > 0;
        document.querySelector("#start-practice").textContent = tieneFiltro
            ? `Practicar eje · ${rutaMaxima} preguntas →`
            : "Iniciar ruta de 10 →";
        document.querySelector("#rotation-eyebrow").textContent = tieneFiltro
            ? `REPASO POR EJE · ${rutaMaxima} PREGUNTAS`
            : "RUTA DIARIA · 10 PREGUNTAS";
        document.querySelector("#rotation-title").textContent = tieneFiltro
            ? "Misión enfocada"
            : "Repaso rotativo";
        document.querySelector("#rotation-copy").textContent = tieneFiltro
            ? "Practica las preguntas únicas de este eje en orden aleatorio; cambia de eje cuando quieras ampliar el recorrido."
            : "Una pregunta por tema. Cada sesión prioriza contenidos distintos hasta recorrer los 24 temas.";
    }

    function iniciarRutaRotativa() {
        const candidatas = obtenerSeleccion();
        const preguntas = elegirPreguntasRotativas(candidatas, Math.min(10, candidatas.length));
        iniciar(preguntas, "ruta");
    }

    function iniciar(preguntas = obtenerSeleccion(), modo = "práctica") {
        preguntasBaseActuales = [...preguntas];
        cola = mezclar([...preguntas]);
        indice = 0;
        respondidas = 0;
        correctas = 0;
        modoActual = modo;
        mostrarPregunta();
    }

    function elegirPreguntasRotativas(candidatas, cantidad) {
        const estado = obtenerEstadoRotacion();
        const temas = [...new Set(candidatas.map((pregunta) => pregunta.temaId))];
        if (!temas.length) return [];
        const aparicionesSesion = new Map(temas.map((temaId) => [temaId, 0]));
        const preguntasElegidas = [];

        for (let lugar = 0; lugar < cantidad; lugar += 1) {
            const menorFrecuencia = Math.min(...temas.map((temaId) =>
                (estado.usos[String(temaId)] || 0) + aparicionesSesion.get(temaId)
            ));
            const temasDisponibles = temas.filter((temaId) =>
                (estado.usos[String(temaId)] || 0) + aparicionesSesion.get(temaId) === menorFrecuencia
            );
            const temaId = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
            const opciones = candidatas.filter((pregunta) =>
                pregunta.temaId === temaId && !preguntasElegidas.includes(pregunta)
            );
            if (!opciones.length) {
                console.error(`No hay preguntas suficientes para completar la ruta en el tema ${temaId}.`);
                break;
            }
            preguntasElegidas.push(opciones[Math.floor(Math.random() * opciones.length)]);
            aparicionesSesion.set(temaId, aparicionesSesion.get(temaId) + 1);
        }

        temas.forEach((temaId) => {
            estado.usos[String(temaId)] = (estado.usos[String(temaId)] || 0) + aparicionesSesion.get(temaId);
        });
        localStorage.setItem(CLAVE_ROTACION_PRACTICA, JSON.stringify(estado));
        return preguntasElegidas;
    }

    function obtenerEstadoRotacion() {
        const guardado = localStorage.getItem(CLAVE_ROTACION_PRACTICA);
        if (!guardado) return { usos: {} };
        try {
            const estado = JSON.parse(guardado);
            if (
                !estado ||
                typeof estado.usos !== "object" ||
                Array.isArray(estado.usos) ||
                Object.values(estado.usos).some((uso) => !Number.isFinite(uso) || uso < 0)
            ) {
                throw new TypeError("El estado de rotación debe contener el uso por tema.");
            }
            return estado;
        } catch (error) {
            console.error("No se pudo leer el historial de rotación de práctica.", error);
            return { usos: {} };
        }
    }

    function mezclar(elementos) {
        for (let i = elementos.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
        }
        return elementos;
    }

    function mostrarPregunta() {
        area.replaceChildren();
        if (indice >= cola.length) {
            mostrarResumen();
            return;
        }

        const pregunta = cola[indice];
        const tema = obtenerTema(pregunta.temaId);
        const encabezado = document.createElement("div");
        encabezado.className = "question-meta";
        encabezado.innerHTML = `<span class="pill">${modoActual === "ensayo" ? "ENSAYO 64" : `PREGUNTA ${indice + 1} DE ${cola.length}`}</span><span>${pregunta.dificultad}</span>`;
        area.append(encabezado);

        const tituloTema = document.createElement("p");
        tituloTema.className = "question-topic";
        tituloTema.textContent = `${tema.nombreBloque} · ${tema.titulo}`;
        area.append(tituloTema);

        const enunciado = document.createElement("h2");
        enunciado.className = "question-prompt";
        enunciado.textContent = pregunta.enunciado;
        area.append(enunciado);

        const alternativas = document.createElement("div");
        alternativas.className = "answer-options";
        alternativas.setAttribute("role", "group");
        alternativas.setAttribute("aria-label", "Alternativas de respuesta");
        pregunta.alternativas.forEach((alternativa, opcion) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "answer-option";
            boton.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + opcion)}</span>`;
            const texto = document.createElement("span");
            texto.textContent = alternativa;
            boton.append(texto);
            boton.addEventListener("click", () => responder(opcion, pregunta, alternativas));
            alternativas.append(boton);
        });
        area.append(alternativas);
    }

    function responder(opcion, pregunta, alternativas) {
        if (alternativas.dataset.answered) return;
        alternativas.dataset.answered = "true";
        const esCorrecta = opcion === pregunta.correcta;
        respondidas += 1;
        if (esCorrecta) correctas += 1;
        registrarRespuesta(esCorrecta, pregunta);

        [...alternativas.children].forEach((boton, posicion) => {
            boton.disabled = true;
            if (posicion === pregunta.correcta) boton.classList.add("is-correct");
            else if (posicion === opcion) boton.classList.add("is-wrong");
        });

        const feedback = document.createElement("div");
        feedback.className = `answer-feedback ${esCorrecta ? "feedback-correct" : "feedback-wrong"}`;
        const titulo = document.createElement("strong");
        titulo.textContent = esCorrecta ? "¡Muy bien! Respuesta correcta." : "Aún no. Revisemos el razonamiento.";
        const detalle = document.createElement("p");
        detalle.textContent = pregunta.explicacion;
        feedback.append(titulo, detalle);
        area.append(feedback);

        const siguiente = document.createElement("button");
        siguiente.type = "button";
        siguiente.className = "button button-primary next-question";
        siguiente.textContent = indice + 1 < cola.length ? "Siguiente pregunta →" : "Ver resultado →";
        siguiente.addEventListener("click", () => {
            indice += 1;
            mostrarPregunta();
        });
        area.append(siguiente);
    }

    function mostrarResumen() {
        const porcentaje = respondidas ? Math.round(correctas / respondidas * 100) : 0;
        const mensaje = document.createElement("div");
        mensaje.className = "empty-state practice-summary";
        const icono = document.createElement("span");
        icono.className = "empty-icon";
        icono.textContent = porcentaje >= 70 ? "✦" : "↗";
        const titulo = document.createElement("h2");
        titulo.textContent = modoActual === "ensayo"
            ? "Ensayo de 64 preguntas completado"
            : modoActual === "ruta" ? "Ruta rotativa completada" : "Práctica completada";
        const detalle = document.createElement("p");
        detalle.textContent = `Lograste ${correctas} de ${respondidas} respuestas correctas (${porcentaje}%). Revisa los temas que te costaron y vuelve a intentarlo.`;
        const repetir = document.createElement("button");
        repetir.type = "button";
        repetir.className = "button button-primary";
        repetir.textContent = modoActual === "ensayo"
            ? "Repetir el ensayo de 64"
            : modoActual === "ruta" ? "Nueva ruta de 10" : "Repetir práctica";
        repetir.addEventListener("click", () => {
            if (modoActual === "ensayo") iniciar([...preguntasM1], "ensayo");
            else if (modoActual === "ruta") iniciarRutaRotativa();
            else iniciar(preguntasBaseActuales, modoActual);
        });
        mensaje.append(icono, titulo, detalle, repetir);
        area.append(mensaje);
    }
}