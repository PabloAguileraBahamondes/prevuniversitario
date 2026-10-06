// Banco original de práctica, alineado con las habilidades y ejes de M1.
// Son preguntas de elaboración propia; no son preguntas oficiales DEMRE.
const preguntasM1 = [
    {
        id: "m1-01", temaId: 1, bloque: 1, dificultad: "Inicial",
        enunciado: "En una recta numérica, un punto está en −5 y avanza 8 unidades hacia la derecha. ¿En qué número queda?",
        alternativas: ["−13", "−3", "3", "13"], correcta: 2,
        explicacion: "Avanzar a la derecha equivale a sumar: −5 + 8 = 3."
    },
    {
        id: "m1-02", temaId: 2, bloque: 1, dificultad: "Inicial",
        enunciado: "¿Cuál es el resultado de 2/3 + 1/4?",
        alternativas: ["3/7", "9/12", "11/12", "1"], correcta: 2,
        explicacion: "Con denominador común 12: 2/3 = 8/12 y 1/4 = 3/12. La suma es 11/12."
    },
    {
        id: "m1-03", temaId: 3, bloque: 1, dificultad: "Aplicación",
        enunciado: "A las 8:00, la temperatura era 4 °C. Durante la mañana bajó 9 °C y luego subió 2 °C. ¿Cuál fue la temperatura final?",
        alternativas: ["−7 °C", "−3 °C", "3 °C", "15 °C"], correcta: 1,
        explicacion: "Representamos las variaciones con signos: 4 − 9 + 2 = −3 °C."
    },
    {
        id: "m1-04", temaId: 4, bloque: 2, dificultad: "Inicial",
        enunciado: "En un curso de 150 estudiantes, el 30% participa en un taller. ¿Cuántos estudiantes participan?",
        alternativas: ["30", "45", "50", "120"], correcta: 1,
        explicacion: "30% de 150 es 0,30 × 150 = 45 estudiantes."
    },
    {
        id: "m1-05", temaId: 5, bloque: 2, dificultad: "Aplicación",
        enunciado: "Una mochila cuesta $40.000 y tiene un descuento de 25%. ¿Cuál es su precio con descuento?",
        alternativas: ["$10.000", "$25.000", "$30.000", "$35.000"], correcta: 2,
        explicacion: "Se paga el 75% del precio: 40.000 × 0,75 = $30.000."
    },
    {
        id: "m1-06", temaId: 6, bloque: 3, dificultad: "Inicial",
        enunciado: "¿Cuál es el valor de 3² × 3³?",
        alternativas: ["81", "162", "243", "729"], correcta: 2,
        explicacion: "Al multiplicar potencias de igual base se suman los exponentes: 3⁵ = 243."
    },
    {
        id: "m1-07", temaId: 7, bloque: 3, dificultad: "Aplicación",
        enunciado: "¿Cuál es la simplificación de √98?",
        alternativas: ["7√2", "14√7", "49√2", "7√14"], correcta: 0,
        explicacion: "98 = 49 × 2, por lo tanto √98 = √49 × √2 = 7√2."
    },
    {
        id: "m1-08", temaId: 8, bloque: 3, dificultad: "Aplicación",
        enunciado: "Una baldosa cuadrada tiene un área de 144 cm². ¿Cuánto mide cada lado?",
        alternativas: ["12 cm", "24 cm", "36 cm", "72 cm"], correcta: 0,
        explicacion: "El lado es la raíz cuadrada del área: √144 = 12 cm."
    },
    {
        id: "m1-09", temaId: 9, bloque: 4, dificultad: "Aplicación",
        enunciado: "¿Qué expresión resulta al simplificar 2(3x − 1) + 4?",
        alternativas: ["6x + 2", "6x + 3", "5x + 2", "6x − 6"], correcta: 0,
        explicacion: "Distribuye el 2: 6x − 2 + 4 = 6x + 2."
    },
    {
        id: "m1-10", temaId: 10, bloque: 4, dificultad: "Aplicación",
        enunciado: "Un servicio de despacho cobra $1.500 fijos más $800 por cada kilómetro recorrido. ¿Qué expresión representa el costo C, en pesos, para k kilómetros?",
        alternativas: ["C = 2.300k", "C = 1.500 + 800k", "C = 800 + 1.500k", "C = 1.500k − 800"], correcta: 1,
        explicacion: "El cobro fijo se suma al cobro variable: C = 1.500 + 800k."
    },
    {
        id: "m1-11", temaId: 11, bloque: 4, dificultad: "Aplicación",
        enunciado: "Si 5 entradas cuestan $22.500, ¿cuánto cuestan 8 entradas al mismo precio unitario?",
        alternativas: ["$27.000", "$32.500", "$36.000", "$40.000"], correcta: 2,
        explicacion: "El precio unitario es 22.500 ÷ 5 = $4.500. Entonces 8 cuestan 8 × 4.500 = $36.000."
    },
    {
        id: "m1-12", temaId: 12, bloque: 4, dificultad: "Aplicación",
        enunciado: "Seis máquinas iguales completan un trabajo en 10 horas. Si todas trabajan al mismo ritmo, ¿cuánto tardan 12 máquinas?",
        alternativas: ["5 horas", "10 horas", "15 horas", "20 horas"], correcta: 0,
        explicacion: "Es proporcionalidad inversa: 6 × 10 = 12 × t. Así, t = 5 horas."
    },
    {
        id: "m1-13", temaId: 13, bloque: 4, dificultad: "Inicial",
        enunciado: "¿Cuál es la solución de la ecuación 2x + 7 = 19?",
        alternativas: ["x = 5", "x = 6", "x = 12", "x = 13"], correcta: 1,
        explicacion: "Restando 7: 2x = 12. Dividiendo por 2: x = 6."
    },
    {
        id: "m1-14", temaId: 14, bloque: 4, dificultad: "Aplicación",
        enunciado: "En un evento, 2 adultos y 1 niño pagan $13.000. Un adulto y 1 niño pagan $8.000. Si a es el precio adulto y n el infantil, ¿cuál es el par (a, n)?",
        alternativas: ["($3.000, $5.000)", "($5.000, $3.000)", "($6.000, $2.000)", "($8.000, $5.000)"], correcta: 1,
        explicacion: "El sistema es 2a + n = 13.000 y a + n = 8.000. Restando las ecuaciones, a = 5.000; luego n = 3.000."
    },
    {
        id: "m1-15", temaId: 15, bloque: 5, dificultad: "Inicial",
        enunciado: "Sea f(x) = 3x − 2. ¿Cuánto vale f(4)?",
        alternativas: ["6", "10", "12", "14"], correcta: 1,
        explicacion: "Sustituye x = 4: f(4) = 3 × 4 − 2 = 10."
    },
    {
        id: "m1-16", temaId: 16, bloque: 5, dificultad: "Aplicación",
        enunciado: "Un estacionamiento cobra $500 de entrada y $120 por cada hora. ¿Cuánto se paga por 4 horas?",
        alternativas: ["$480", "$620", "$980", "$2.480"], correcta: 2,
        explicacion: "El costo es 500 + 120 × 4 = $980."
    },
    {
        id: "m1-17", temaId: 17, bloque: 5, dificultad: "Aplicación",
        enunciado: "¿Cuál es la ecuación del eje de simetría de la parábola y = x² − 6x + 5?",
        alternativas: ["x = −6", "x = −3", "x = 3", "x = 6"], correcta: 2,
        explicacion: "Para ax² + bx + c, el eje es x = −b/(2a). Aquí x = 6/2 = 3."
    },
    {
        id: "m1-18", temaId: 18, bloque: 5, dificultad: "Aplicación",
        enunciado: "La altura de un objeto está dada por h(t) = −t² + 6t, en metros, tras t segundos. ¿Cuándo vuelve al suelo después de ser lanzado?",
        alternativas: ["A los 3 s", "A los 5 s", "A los 6 s", "A los 12 s"], correcta: 2,
        explicacion: "Al llegar al suelo h(t) = 0: −t² + 6t = t(6 − t) = 0. Las soluciones son 0 y 6; vuelve a los 6 segundos."
    },
    {
        id: "m1-19", temaId: 19, bloque: 6, dificultad: "Inicial",
        enunciado: "Un triángulo rectángulo tiene catetos de 5 cm y 12 cm. ¿Cuánto mide la hipotenusa?",
        alternativas: ["13 cm", "15 cm", "17 cm", "25 cm"], correcta: 0,
        explicacion: "Por Pitágoras, c² = 5² + 12² = 25 + 144 = 169. Entonces c = 13 cm."
    },
    {
        id: "m1-20", temaId: 20, bloque: 6, dificultad: "Inicial",
        enunciado: "Una caja rectangular mide 2 cm de ancho, 3 cm de largo y 4 cm de alto. ¿Cuál es su volumen?",
        alternativas: ["9 cm³", "14 cm³", "24 cm³", "48 cm³"], correcta: 2,
        explicacion: "El volumen es largo × ancho × alto: 2 × 3 × 4 = 24 cm³."
    },
    {
        id: "m1-21", temaId: 21, bloque: 6, dificultad: "Aplicación",
        enunciado: "Al reflejar el punto (3, −2) respecto del eje y, ¿cuáles son las coordenadas de su imagen?",
        alternativas: ["(−3, −2)", "(3, 2)", "(−3, 2)", "(2, −3)"], correcta: 0,
        explicacion: "La reflexión en el eje y cambia el signo de x y conserva y: (3, −2) pasa a (−3, −2)."
    },
    {
        id: "m1-22", temaId: 22, bloque: 7, dificultad: "Inicial",
        enunciado: "¿Cuál es la media aritmética de los datos 2, 3, 7 y 8?",
        alternativas: ["4", "5", "6", "20"], correcta: 1,
        explicacion: "La media es (2 + 3 + 7 + 8) ÷ 4 = 20 ÷ 4 = 5."
    },
    {
        id: "m1-23", temaId: 23, bloque: 7, dificultad: "Inicial",
        enunciado: "Los datos ordenados son 3, 5, 8, 11 y 14. ¿Cuál es la mediana?",
        alternativas: ["5", "8", "9", "11"], correcta: 1,
        explicacion: "Hay cinco datos ordenados; la mediana es el valor central, 8."
    },
    {
        id: "m1-24", temaId: 24, bloque: 7, dificultad: "Inicial",
        enunciado: "En una bolsa hay 4 fichas rojas y 3 azules. Si se extrae una ficha al azar, ¿cuál es la probabilidad de que sea roja?",
        alternativas: ["3/7", "4/7", "1/2", "4/3"], correcta: 1,
        explicacion: "Hay 4 resultados favorables de 7 fichas posibles, así que la probabilidad es 4/7."
    }
];

function obtenerPreguntasPorBloque(bloque) {
    return preguntasM1.filter((pregunta) => pregunta.bloque === Number(bloque));
}