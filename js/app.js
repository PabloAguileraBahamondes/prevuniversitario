const CLAVE_PROGRESO = "paesM1_progreso";

function crearProgresoVacio() {
    return {
        preguntasRespondidas: 0,
        respuestasCorrectas: 0,
        racha: 0,
        fechaEstudio: null,
        temasCompletados: [],
        porTema: {},
        errores: []
    };
}

function fechaLocalISO(fecha = new Date()) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
}

function obtenerProgreso() {
    const guardado = localStorage.getItem(CLAVE_PROGRESO);
    if (!guardado) return crearProgresoVacio();

    try {
        const progreso = JSON.parse(guardado);
        const normalizado = {
            ...crearProgresoVacio(),
            ...progreso,
            temasCompletados: Array.isArray(progreso.temasCompletados) ? progreso.temasCompletados : [],
            porTema: progreso.porTema && typeof progreso.porTema === "object" ? progreso.porTema : {},
            errores: Array.isArray(progreso.errores) ? progreso.errores : []
        };
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        if (normalizado.fechaEstudio !== fechaLocalISO() && normalizado.fechaEstudio !== fechaLocalISO(ayer)) {
            normalizado.racha = 0;
        }
        return normalizado;
    } catch (error) {
        console.error("No se pudo leer el progreso guardado; se iniciará uno nuevo.", error);
        return crearProgresoVacio();
    }
}

function guardarProgreso(datos) {
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(datos));
}

function actualizarDatos() {
    const progreso = obtenerProgreso();
    const total = document.querySelector("#total-preguntas");
    const precision = document.querySelector("#precision");
    const racha = document.querySelector("#racha");
    const temas = document.querySelector("#total-temas");
    const avanceTemario = document.querySelector("#temario-completado");
    const porcentaje = progreso.preguntasRespondidas
        ? Math.round(progreso.respuestasCorrectas / progreso.preguntasRespondidas * 100)
        : 0;

    if (total) total.textContent = progreso.preguntasRespondidas;
    if (precision) precision.textContent = `${porcentaje}%`;
    if (racha) racha.textContent = `${progreso.racha} días`;
    if (temas) temas.textContent = `${progreso.temasCompletados.length}/24`;
    if (avanceTemario) avanceTemario.textContent = `${Math.round(progreso.temasCompletados.length / 24 * 100)}%`;

    const relleno = document.querySelector("#home-progress-fill");
    if (relleno) relleno.style.width = `${Math.round(progreso.temasCompletados.length / 24 * 100)}%`;
    const porcentajeTema = document.querySelector("#home-topic-progress");
    if (porcentajeTema) {
        const visto = progreso.porTema["1"];
        const pct = visto && visto.respondidas ? Math.round(visto.correctas / visto.respondidas * 100) : 0;
        porcentajeTema.textContent = `${pct}%`;
    }
}

function marcarPaginaActual() {
    const pagina = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".sidebar .menu-item").forEach((enlace) => {
        const activo = enlace.getAttribute("href") === pagina;
        enlace.classList.toggle("active", activo);
        if (activo) enlace.setAttribute("aria-current", "page");
        else enlace.removeAttribute("aria-current");
    });
}

function registrarRespuesta(esCorrecta, pregunta) {
    const progreso = obtenerProgreso();
    const hoy = fechaLocalISO();
    const fechaAyer = new Date();
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    const ayer = fechaLocalISO(fechaAyer);

    if (progreso.fechaEstudio !== hoy) {
        progreso.racha = progreso.fechaEstudio === ayer ? progreso.racha + 1 : 1;
        progreso.fechaEstudio = hoy;
    }

    progreso.preguntasRespondidas += 1;
    if (esCorrecta) progreso.respuestasCorrectas += 1;

    if (pregunta && pregunta.temaId) {
        const id = String(pregunta.temaId);
        const resumen = progreso.porTema[id] || { respondidas: 0, correctas: 0 };
        resumen.respondidas += 1;
        if (esCorrecta) resumen.correctas += 1;
        progreso.porTema[id] = resumen;

        if (esCorrecta && !progreso.temasCompletados.includes(Number(id))) {
            progreso.temasCompletados.push(Number(id));
        }
    }

    if (!esCorrecta && pregunta) {
        progreso.errores.push({
            preguntaId: pregunta.id || null,
            pregunta: pregunta.enunciado || String(pregunta),
            temaId: pregunta.temaId || null,
            fecha: new Date().toISOString()
        });
        progreso.errores = progreso.errores.slice(-100);
    }

    guardarProgreso(progreso);
    actualizarDatos();
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarDatos();
    marcarPaginaActual();
    instalarHerramientasDeEstudio();
    const continuar = document.querySelector("#continue-study");
    if (continuar) continuar.addEventListener("click", () => {
        window.location.href = "temario.html";
    });

    function instalarHerramientasDeEstudio() {
        if (document.querySelector(".study-tools")) return;

        const herramientas = document.createElement("div");
        herramientas.className = "study-tools";
        herramientas.innerHTML = `
            <button class="study-tool" type="button" data-open-calculator aria-label="Abrir calculadora">⌗ <span>Calculadora</span></button>
            <button class="study-tool" type="button" data-open-formulas aria-label="Abrir formulario M1">∑ <span>Fórmulas M1</span></button>
            <button class="study-tool" type="button" data-open-tutor aria-label="Abrir tutor local M1">✦ <span>Tutor M1</span></button>
        `;
        document.body.append(herramientas);

        const calculadora = document.createElement("dialog");
        calculadora.className = "tool-dialog calculator-dialog";
        calculadora.setAttribute("aria-labelledby", "calculator-title");
        calculadora.innerHTML = `
            <div class="tool-dialog-head"><div><span class="eyebrow">HERRAMIENTA DE ESTUDIO</span><h2 id="calculator-title">Calculadora</h2></div><button class="icon-button" type="button" data-close aria-label="Cerrar calculadora">×</button></div>
            <div class="calculator-display">
                <input id="calculator-expression" type="text" inputmode="decimal" autocomplete="off" aria-label="Expresión matemática" placeholder="Escribe una operación" maxlength="80">
                <output id="calculator-result" aria-live="polite">0</output>
                <p id="calculator-message" aria-live="polite">Operaciones, paréntesis, potencias y raíces.</p>
            </div>
            <div class="calculator-keypad">
                <button type="button" data-calc="clear" class="key-muted">AC</button>
                <button type="button" data-value="(">(</button><button type="button" data-value=")">)</button><button type="button" data-value="÷" class="key-operator">÷</button>
                <button type="button" data-value="7">7</button><button type="button" data-value="8">8</button><button type="button" data-value="9">9</button><button type="button" data-value="×" class="key-operator">×</button>
                <button type="button" data-value="4">4</button><button type="button" data-value="5">5</button><button type="button" data-value="6">6</button><button type="button" data-value="-" class="key-operator">−</button>
                <button type="button" data-value="1">1</button><button type="button" data-value="2">2</button><button type="button" data-value="3">3</button><button type="button" data-value="+" class="key-operator">+</button>
                <button type="button" data-value="^" class="key-muted">xʸ</button><button type="button" data-value="0">0</button><button type="button" data-value=".">.</button><button type="button" data-calc="backspace" class="key-muted">⌫</button>
                <button type="button" data-value="√(" class="key-muted">√</button><button type="button" data-calc="calculate" class="key-equals">Calcular =</button>
            </div>`;
        document.body.append(calculadora);

        const formulario = document.createElement("dialog");
        formulario.className = "tool-dialog formula-dialog";
        formulario.setAttribute("aria-labelledby", "formula-title");
        formulario.innerHTML = `
            <div class="tool-dialog-head"><div><span class="eyebrow">REPASO RÁPIDO</span><h2 id="formula-title">Formulario M1</h2></div><button class="icon-button" type="button" data-close aria-label="Cerrar formulario">×</button></div>
            <p class="formula-intro">Una hoja de apoyo para repasar relaciones frecuentes. Comprueba qué datos entrega cada problema antes de elegir una fórmula.</p>
            <div class="formula-grid">
                <section><span class="pill">NÚMEROS Y PORCENTAJES</span><h3>Porcentaje</h3><p>p% de N = (p / 100) · N</p><p>Valor con aumento p% = N · (1 + p / 100)</p><p>Valor con descuento p% = N · (1 − p / 100)</p></section>
                <section><span class="pill">ÁLGEBRA Y FUNCIONES</span><h3>Relaciones</h3><p>Proporcionalidad directa: y = kx</p><p>Proporcionalidad inversa: xy = k</p><p>Función afín: f(x) = mx + n</p><p>Pendiente: m = (y₂ − y₁) / (x₂ − x₁)</p><p>Eje de simetría: x = −b / (2a)</p></section>
                <section><span class="pill">GEOMETRÍA</span><h3>Medidas</h3><p>Pitágoras: a² + b² = c²</p><p>Rectángulo: A = base · altura</p><p>Triángulo: A = (base · altura) / 2</p><p>Prisma: V = área de la base · altura</p></section>
                <section><span class="pill">DATOS Y AZAR</span><h3>Estadística y probabilidad</h3><p>Media = suma de datos / cantidad de datos</p><p>Rango intercuartílico = Q₃ − Q₁</p><p>P(A) = casos favorables / casos posibles, si son equiprobables</p></section>
            </div>
            <p class="source-note">Formulario de apoyo educativo. La prueba puede evaluar interpretación, modelación y argumentación, no solo sustitución en fórmulas.</p>`;
        document.body.append(formulario);

        herramientas.querySelector("[data-open-calculator]").addEventListener("click", () => {
            calculadora.showModal();
            calculadora.querySelector("#calculator-expression").focus();
        });
        herramientas.querySelector("[data-open-formulas]").addEventListener("click", () => formulario.showModal());
        [calculadora, formulario].forEach((dialogo) => {
            dialogo.querySelector("[data-close]").addEventListener("click", () => dialogo.close());
            dialogo.addEventListener("click", (evento) => {
                if (evento.target === dialogo) dialogo.close();
            });
        });
        configurarCalculadora(calculadora);
    }

    function configurarCalculadora(dialogo) {
        const expresion = dialogo.querySelector("#calculator-expression");
        const resultado = dialogo.querySelector("#calculator-result");
        const mensaje = dialogo.querySelector("#calculator-message");

        dialogo.querySelector(".calculator-keypad").addEventListener("click", (evento) => {
            const boton = evento.target.closest("button");
            if (!boton) return;
            const comando = boton.dataset.calc;
            if (comando === "clear") {
                expresion.value = "";
                resultado.textContent = "0";
                mensaje.textContent = "Operaciones, paréntesis, potencias y raíces.";
            } else if (comando === "backspace") {
                expresion.value = expresion.value.slice(0, -1);
            } else if (comando === "calculate") {
                calcular();
                return;
            } else if (boton.dataset.value) {
                expresion.value += boton.dataset.value;
            }
            expresion.focus();
        });

        expresion.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === "=") {
                evento.preventDefault();
                calcular();
            }
            if (evento.key === "Escape") {
                expresion.value = "";
                resultado.textContent = "0";
                mensaje.textContent = "Operación borrada.";
            }
        });

        function calcular() {
            try {
                const valor = evaluarExpresion(expresion.value);
                if (!Number.isFinite(valor)) throw new Error("El resultado no es un número finito.");
                resultado.textContent = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 10 }).format(valor);
                mensaje.textContent = "Resultado calculado correctamente.";
            } catch (error) {
                resultado.textContent = "—";
                mensaje.textContent = error.message;
            }
        }
    }

    function evaluarExpresion(texto) {
        if (!texto.trim()) throw new Error("Escribe una operación para calcular.");
        const normalizado = texto.trim().replace(/×/g, "*").replace(/÷/g, "/");
        const tokens = [];
        const patron = /\s*(\d+(?:\.\d*)?|\.\d+|[()+\-*/^√])\s*/gy;
        let posicion = 0;
        while (posicion < normalizado.length) {
            patron.lastIndex = posicion;
            const coincidencia = patron.exec(normalizado);
            if (!coincidencia) throw new Error("Usa solo números y operaciones matemáticas válidas.");
            tokens.push(coincidencia[1]);
            posicion = patron.lastIndex;
        }

        let cursor = 0;
        const actual = () => tokens[cursor];
        const consumir = () => tokens[cursor++];
        const expresion = () => {
            let valor = termino();
            while (actual() === "+" || actual() === "-") {
                const operador = consumir();
                const siguiente = termino();
                valor = operador === "+" ? valor + siguiente : valor - siguiente;
            }
            return valor;
        };
        const termino = () => {
            let valor = unario();
            while (["*", "/"].includes(actual())) {
                const operador = consumir();
                const siguiente = unario();
                if (operador === "/" && siguiente === 0) throw new Error("No se puede dividir por cero.");
                valor = operador === "*" ? valor * siguiente : valor / siguiente;
            }
            return valor;
        };
        const unario = () => {
            if (actual() === "+") {
                consumir();
                return unario();
            }
            if (actual() === "-") {
                consumir();
                return -unario();
            }
            return potencia();
        };
        const potencia = () => {
            const base = primario();
            if (actual() === "^") {
                consumir();
                return base ** unario();
            }
            return base;
        };
        const primario = () => {
            if (actual() === "√") {
                consumir();
                let radicando;
                if (actual() === "(") {
                    consumir();
                    radicando = expresion();
                    if (consumir() !== ")") throw new Error("Revisa los paréntesis de la raíz.");
                } else {
                    radicando = primario();
                }
                if (radicando < 0) throw new Error("La raíz cuadrada real requiere un número no negativo.");
                return Math.sqrt(radicando);
            }
            if (actual() === "(") {
                consumir();
                const valor = expresion();
                if (consumir() !== ")") throw new Error("Revisa los paréntesis de la operación.");
                return valor;
            }
            const token = consumir();
            if (token === undefined || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) {
                throw new Error("La operación está incompleta. Revisa números y operadores.");
            }
            return Number(token);
        };

        const respuesta = expresion();
        if (cursor !== tokens.length) throw new Error("Revisa la operación: hay símbolos sin resolver.");
        return respuesta;
    }
    const empezarTema = document.querySelector("#start-topic");
    if (empezarTema) empezarTema.addEventListener("click", () => {
        window.location.href = "temario.html?tema=1";
    });
});