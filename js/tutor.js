const ALIAS_TEMAS_M1 = [
    { temas: [1, 2, 3], palabras: ["fraccion", "fracciones", "racional", "racionales", "entero", "enteros", "negativo", "negativos", "positivo", "positivos", "signos", "recta numerica"] },
    { temas: [4, 5], palabras: ["porcentaje", "porcentajes", "porciento", "descuento", "descuentos", "aumento", "aumentos", "rebaja", "rebajas"] },
    { temas: [6, 7, 8], palabras: ["potencia", "potencias", "exponente", "exponentes", "raiz", "raices", "radical", "radicales"] },
    { temas: [9, 10], palabras: ["algebra", "expresion", "expresiones", "factorizar", "factorizacion", "distributiva", "terminos semejantes"] },
    { temas: [11, 12], palabras: ["proporcionalidad", "proporcional", "razon", "razones", "regla de tres", "directa", "inversa"] },
    { temas: [13], palabras: ["ecuacion", "ecuaciones", "inecuacion", "inecuaciones", "despejar"] },
    { temas: [14], palabras: ["sistema", "sistemas", "dos ecuaciones", "eliminacion", "sustitucion"] },
    { temas: [15, 16], palabras: ["funcion lineal", "funcion afin", "pendiente", "tasa de cambio", "intercepto", "lineal", "afín"] },
    { temas: [17, 18], palabras: ["cuadratica", "parabola", "vertice", "ceros", "eje de simetria", "segundo grado"] },
    { temas: [19], palabras: ["pitagoras", "triangulo", "triangulo rectangulo", "hipotenusa", "area", "perimetro"] },
    { temas: [20], palabras: ["cuerpo geometrico", "volumen", "prisma", "cubo", "superficie"] },
    { temas: [21], palabras: ["transformacion", "isometria", "traslacion", "rotacion", "reflexion", "coordenadas"] },
    { temas: [22], palabras: ["estadistica", "media", "promedio", "frecuencia", "tabla", "grafico"] },
    { temas: [23], palabras: ["cuartil", "cuartiles", "percentil", "percentiles", "mediana", "rango intercuartilico", "diagrama de caja"] },
    { temas: [24], palabras: ["probabilidad", "azar", "evento", "eventos", "casos favorables", "dado"] }
];

const PALABRAS_VACIAS_TUTOR = new Set([
    "ayuda", "con", "cual", "cuales", "como", "de", "del", "el", "en", "es",
    "explica", "explicame", "hacer", "hago", "la", "las", "lo", "los", "me",
    "necesito", "no", "para", "por", "puedes", "que", "quiero", "resuelve",
    "sobre", "tema", "un", "una", "uno", "y"
]);

document.addEventListener("DOMContentLoaded", iniciarTutorLocalM1);

function iniciarTutorLocalM1() {
    const botonAbrir = document.querySelector("[data-open-tutor]");
    if (!botonAbrir || !Array.isArray(temarioM1)) return;

    const dialogo = document.createElement("dialog");
    dialogo.className = "tool-dialog tutor-dialog";
    dialogo.setAttribute("aria-labelledby", "tutor-title");
    dialogo.innerHTML = `
        <div class="tool-dialog-head">
            <div><span class="eyebrow">ASISTENTE DE ESTUDIO LOCAL</span><h2 id="tutor-title">Tutor M1</h2></div>
            <button class="icon-button" type="button" data-close aria-label="Cerrar tutor">×</button>
        </div>
        <p class="tutor-disclaimer">Responde usando las lecciones incluidas en este sitio. No es IA generativa y tus consultas no salen de tu dispositivo.</p>
        <div class="tutor-messages" id="tutor-messages" role="log" aria-live="polite" aria-relevant="additions">
            <article class="tutor-message tutor-reply">
                <strong>Tutor M1</strong>
                <p>¡Hola! Puedo ayudarte a repasar una idea, ver un ejemplo o encontrar un ejercicio de los 24 temas. ¿Qué estás estudiando?</p>
                <div class="tutor-suggestions">
                    <button type="button" data-prompt="Explícame los porcentajes">Porcentajes</button>
                    <button type="button" data-prompt="Dame un ejercicio de ecuaciones">Ecuaciones</button>
                    <button type="button" data-prompt="Explícame la probabilidad">Probabilidad</button>
                </div>
            </article>
        </div>
        <form class="tutor-form" id="tutor-form">
            <label class="visually-hidden" for="tutor-question">Escribe tu consulta sobre M1</label>
            <textarea id="tutor-question" rows="2" maxlength="500" placeholder="Ej.: ¿Cómo calculo un descuento?"></textarea>
            <button class="button button-primary" type="submit">Enviar</button>
        </form>
        <p class="tutor-hint">Consejo: escribe el tema y qué parte te causa duda.</p>`;
    document.body.append(dialogo);

    botonAbrir.addEventListener("click", () => {
        dialogo.showModal();
        dialogo.querySelector("#tutor-question").focus();
    });
    dialogo.querySelector("[data-close]").addEventListener("click", () => dialogo.close());
    dialogo.addEventListener("click", (evento) => {
        if (evento.target === dialogo) dialogo.close();
    });
    dialogo.querySelector("#tutor-form").addEventListener("submit", (evento) => {
        evento.preventDefault();
        enviarConsulta();
    });
    dialogo.querySelectorAll("[data-prompt]").forEach((boton) => {
        boton.addEventListener("click", () => {
            dialogo.querySelector("#tutor-question").value = boton.dataset.prompt;
            enviarConsulta();
        });
    });

    function enviarConsulta() {
        const entrada = dialogo.querySelector("#tutor-question");
        const consulta = entrada.value.trim();
        if (!consulta) {
            entrada.focus();
            return;
        }
        agregarMensaje("Tú", consulta, false);
        entrada.value = "";
        const respuesta = responderConsultaM1(consulta);
        agregarRespuesta(respuesta);
    }

    function agregarMensaje(autor, texto, esTutor) {
        const mensaje = document.createElement("article");
        mensaje.className = `tutor-message ${esTutor ? "tutor-reply" : "tutor-user"}`;
        const nombre = document.createElement("strong");
        nombre.textContent = autor;
        const contenido = document.createElement("p");
        contenido.textContent = texto;
        mensaje.append(nombre, contenido);
        dialogo.querySelector("#tutor-messages").append(mensaje);
        desplazarConversacion();
        return mensaje;
    }

    function agregarRespuesta(respuesta) {
        const mensaje = agregarMensaje("Tutor M1", respuesta.texto, true);
        const acciones = document.createElement("div");
        acciones.className = "tutor-actions";

        if (respuesta.tema) {
            const clase = document.createElement("a");
            clase.className = "tutor-link";
            clase.href = `temario.html?tema=${respuesta.tema.id}`;
            clase.textContent = "Abrir esta clase →";
            acciones.append(clase);
        }

        if (respuesta.pregunta) {
            const practica = document.createElement("a");
            practica.className = "tutor-link";
            practica.href = `practica.html?pregunta=${encodeURIComponent(respuesta.pregunta.id)}`;
            practica.textContent = "Resolver ejercicio →";
            acciones.append(practica);
        }

        if (respuesta.pregunta && respuesta.tema) {
            const solucion = document.createElement("details");
            solucion.className = "tutor-solution";
            const resumen = document.createElement("summary");
            resumen.textContent = "Ver solución explicada";
            const desarrollo = document.createElement("p");
            desarrollo.textContent = respuesta.pregunta.explicacion;
            solucion.append(resumen, desarrollo);
            mensaje.append(solucion);
        }

        if (acciones.childElementCount) mensaje.append(acciones);
        const escuchar = document.createElement("button");
        escuchar.type = "button";
        escuchar.className = "tutor-speak";
        escuchar.textContent = "🔊 Escuchar";
        escuchar.addEventListener("click", () => {
            if (!("speechSynthesis" in window)) {
                escuchar.textContent = "Voz no disponible";
                return;
            }
            window.speechSynthesis.cancel();
            const narracion = new SpeechSynthesisUtterance(respuesta.texto);
            narracion.lang = "es-CL";
            narracion.rate = 0.92;
            window.speechSynthesis.speak(narracion);
        });
        mensaje.append(escuchar);
        desplazarConversacion();
    }

    function desplazarConversacion() {
        const mensajes = dialogo.querySelector("#tutor-messages");
        mensajes.scrollTop = mensajes.scrollHeight;
    }
}

function responderConsultaM1(consulta) {
    const texto = normalizarTextoTutor(consulta);
    if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|ayuda)$/.test(texto)) {
        return {
            texto: "¡Hola! Dime un tema de M1 y te mostraré la idea clave, un ejemplo resuelto y, si quieres, un ejercicio para practicar."
        };
    }

    const puntajes = temarioM1.map((tema) => ({
        tema,
        puntaje: calcularCoincidenciaTutor(texto, tema)
    })).sort((a, b) => b.puntaje - a.puntaje);

    if (!puntajes.length || puntajes[0].puntaje < 1) {
        return {
            texto: "No encontré un tema específico en tu consulta. Puedo ayudarte con números, porcentajes, potencias y raíces, álgebra, funciones, geometría, estadística o probabilidad. ¿Cuál de esos estás estudiando?"
        };
    }

    const tema = puntajes[0].tema;
    const subtema = tema.lecciones
        .map((leccion) => ({
            leccion,
            puntaje: calcularCoincidenciaSubtema(texto, leccion.titulo)
        }))
        .sort((a, b) => b.puntaje - a.puntaje)[0];
    const pideEjercicio = /\b(ejercicio|pregunta|practica|practicar|entrenar|desafio)\b/.test(texto);
    const preguntasTema = Array.isArray(preguntasM1)
        ? preguntasM1.filter((pregunta) => pregunta.temaId === tema.id)
        : [];
    const pregunta = pideEjercicio && preguntasTema.length
        ? preguntasTema[Math.floor(Math.random() * preguntasTema.length)]
        : null;

    if (pregunta) {
        const alternativas = pregunta.alternativas
            .map((alternativa, indice) => `${String.fromCharCode(65 + indice)}) ${alternativa}`)
            .join("   ");
        return {
            tema,
            pregunta,
            texto: `¡Practiquemos ${tema.titulo}! ${pregunta.enunciado}\n\n${alternativas}\n\nElige una alternativa y trata de explicar por qué antes de abrir la solución.`
        };
    }

    if (subtema && subtema.puntaje > 0) {
        const leccion = subtema.leccion;
        const textoRespuesta = [
            `Vamos con ${leccion.titulo}, del tema ${tema.titulo}.`,
            `Idea clave: ${leccion.idea}`,
            `Ejemplo: ${leccion.ejemplo}`,
            `Desarrollo: ${leccion.solucion}`,
            `Puedes abrir la ruta completa del tema ${tema.id} para estudiar los demás contenidos.`
        ].join("\n\n");
        return { tema, texto: textoRespuesta };
    }

    const textoRespuesta = [
        `Vamos con ${tema.titulo}, del eje ${tema.nombreBloque}.`,
        `Idea clave: ${tema.idea}`,
        `Ejemplo: ${tema.ejemplo}`,
        `Resolución: ${tema.solucion}`,
        `Ojo con esto: ${tema.error}`,
        "¿Quieres practicar? Pídeme un ejercicio de este tema."
    ].join("\n\n");
    return { tema, texto: textoRespuesta };
}

function calcularCoincidenciaTutor(consulta, tema) {
    const palabras = consulta.split(/\s+/).filter((palabra) =>
        palabra.length > 2 && !PALABRAS_VACIAS_TUTOR.has(palabra)
    );
    const titulo = normalizarTextoTutor(tema.titulo);
    const contenidos = normalizarTextoTutor(tema.contenidos.join(" "));
    const explicacion = normalizarTextoTutor(`${tema.idea} ${tema.ejemplo}`);
    let puntaje = 0;

    palabras.forEach((palabra) => {
        if (titulo.includes(palabra)) puntaje += 5;
        else if (contenidos.includes(palabra)) puntaje += 3;
        else if (explicacion.includes(palabra)) puntaje += 1;
    });

    const consultaConLimites = ` ${consulta} `;
    ALIAS_TEMAS_M1.forEach((grupo) => {
        if (grupo.temas.includes(tema.id) && grupo.palabras.some((alias) =>
            consultaConLimites.includes(` ${normalizarTextoTutor(alias)} `)
        )) {
            puntaje += 6;
        }
    });
    return puntaje;
}

function calcularCoincidenciaSubtema(consulta, titulo) {
    const palabras = consulta.split(/\s+/).filter((palabra) =>
        palabra.length > 2 && !PALABRAS_VACIAS_TUTOR.has(palabra)
    );
    const nombre = normalizarTextoTutor(titulo);
    return palabras.reduce((puntaje, palabra) => puntaje + (nombre.includes(palabra) ? 1 : 0), 0);
}

function normalizarTextoTutor(texto) {
    return String(texto)
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[¿?¡!.,;:()[\]{}]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
