document.addEventListener("DOMContentLoaded", iniciarPractica);

function iniciarPractica() {
    const area = document.querySelector("#practice-area");
    if (!area) return;

    const filtro = document.querySelector("#practice-block");
    const total = document.querySelector("#practice-count");
    let cola = [];
    let indice = 0;
    let respondidas = 0;
    let correctas = 0;

    const preguntaSolicitada = new URLSearchParams(window.location.search).get("pregunta");
    if (preguntaSolicitada) {
        const encontrada = preguntasM1.find((pregunta) => pregunta.id === preguntaSolicitada);
        if (encontrada) {
            filtro.value = String(encontrada.bloque);
            iniciar([encontrada]);
        }
    }

    filtro.addEventListener("change", actualizarCantidad);
    document.querySelector("#start-practice").addEventListener("click", () => iniciar());
    actualizarCantidad();

    function obtenerSeleccion() {
        const bloque = Number(filtro.value);
        return bloque ? obtenerPreguntasPorBloque(bloque) : [...preguntasM1];
    }

    function actualizarCantidad() {
        const cantidad = obtenerSeleccion().length;
        total.textContent = `${cantidad} pregunta${cantidad === 1 ? "" : "s"} disponible${cantidad === 1 ? "" : "s"}`;
    }

    function iniciar(preguntas = obtenerSeleccion()) {
        cola = mezclar([...preguntas]);
        indice = 0;
        respondidas = 0;
        correctas = 0;
        mostrarPregunta();
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
        encabezado.innerHTML = `<span class="pill">PREGUNTA ${indice + 1} DE ${cola.length}</span><span>${pregunta.dificultad}</span>`;
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
        titulo.textContent = "Práctica completada";
        const detalle = document.createElement("p");
        detalle.textContent = `Lograste ${correctas} de ${respondidas} respuestas correctas (${porcentaje}%). Revisa los temas que te costaron y vuelve a intentarlo.`;
        const repetir = document.createElement("button");
        repetir.type = "button";
        repetir.className = "button button-primary";
        repetir.textContent = "Practicar de nuevo";
        repetir.addEventListener("click", () => iniciar());
        mensaje.append(icono, titulo, detalle, repetir);
        area.append(mensaje);
    }
}