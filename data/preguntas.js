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
    },
    {
        id: "m1-25", temaId: 1, bloque: 1, dificultad: "Aplicación", subtema: "Jerarquía de operaciones",
        enunciado: "¿Cuál es el valor de 18 − 2 × (3 + 4)?",
        alternativas: ["4", "16", "28", "112"], correcta: 0,
        explicacion: "Primero resolvemos el paréntesis: 3 + 4 = 7. Luego multiplicamos 2 × 7 = 14 y restamos 18 − 14 = 4."
    },
    {
        id: "m1-26", temaId: 1, bloque: 1, dificultad: "Aplicación", subtema: "Convención de signos",
        enunciado: "En una ciudad, la temperatura era −6 °C y subió 11 °C. ¿Cuál es la nueva temperatura?",
        alternativas: ["−17 °C", "−5 °C", "5 °C", "17 °C"], correcta: 2,
        explicacion: "El aumento se representa sumando: −6 + 11 = 5 °C."
    },
    {
        id: "m1-27", temaId: 2, bloque: 1, dificultad: "Aplicación", subtema: "Fracciones, decimales y enteros",
        enunciado: "¿Cuál de las siguientes fracciones es equivalente a 0,375?",
        alternativas: ["3/8", "3/5", "5/8", "37/5"], correcta: 0,
        explicacion: "0,375 = 375/1000. Simplificando numerador y denominador por 125 se obtiene 3/8."
    },
    {
        id: "m1-28", temaId: 2, bloque: 1, dificultad: "Aplicación", subtema: "Comparación y orden",
        enunciado: "¿Cuál es el mayor de estos números racionales: −2/3, −3/4, 1/2 y −1/5?",
        alternativas: ["−2/3", "−3/4", "1/2", "−1/5"], correcta: 2,
        explicacion: "Los tres primeros negativos son menores que cero; 1/2 es positivo y por lo tanto el mayor."
    },
    {
        id: "m1-29", temaId: 3, bloque: 1, dificultad: "Aplicación", subtema: "Problemas en contextos reales",
        enunciado: "Un buzo está a 12 m bajo el nivel del mar. Sube 5 m y luego desciende 8 m. ¿A qué altura queda respecto del nivel del mar?",
        alternativas: ["−25 m", "−15 m", "−5 m", "1 m"], correcta: 1,
        explicacion: "Tomando el nivel del mar como cero: −12 + 5 − 8 = −15 m."
    },
    {
        id: "m1-30", temaId: 3, bloque: 1, dificultad: "Aplicación", subtema: "Elegir la operación correcta",
        enunciado: "Se reparten 3,6 L de jugo en vasos de 0,3 L cada uno. ¿Cuántos vasos se llenan?",
        alternativas: ["1,2", "9", "12", "108"], correcta: 2,
        explicacion: "Para saber cuántas porciones caben, dividimos el total por la capacidad de cada vaso: 3,6 ÷ 0,3 = 12."
    },
    {
        id: "m1-31", temaId: 4, bloque: 2, dificultad: "Inicial", subtema: "Concepto de porcentaje",
        enunciado: "¿Qué fracción representa el 45%?",
        alternativas: ["9/20", "4/5", "45/10", "20/9"], correcta: 0,
        explicacion: "45% = 45/100. Al simplificar dividiendo por 5 queda 9/20."
    },
    {
        id: "m1-32", temaId: 4, bloque: 2, dificultad: "Aplicación", subtema: "Cálculo directo",
        enunciado: "Una biblioteca tiene 240 libros y el 15% son de ciencias. ¿Cuántos libros de ciencias tiene?",
        alternativas: ["24", "36", "40", "204"], correcta: 1,
        explicacion: "Calculamos 15% de 240: 0,15 × 240 = 36 libros."
    },
    {
        id: "m1-33", temaId: 5, bloque: 2, dificultad: "Aplicación", subtema: "Aumentos y descuentos",
        enunciado: "Una bicicleta de $80.000 aumenta su precio en 10%. ¿Cuál es el nuevo precio?",
        alternativas: ["$80.100", "$88.000", "$90.000", "$72.000"], correcta: 1,
        explicacion: "El aumento es 0,10 × 80.000 = $8.000. El nuevo precio es $88.000."
    },
    {
        id: "m1-34", temaId: 5, bloque: 2, dificultad: "Desafío", subtema: "Porcentaje de porcentaje",
        enunciado: "En una escuela de 200 estudiantes, el 40% participa en deportes y el 25% de ese grupo compite. ¿Cuántos compiten?",
        alternativas: ["20", "25", "40", "80"], correcta: 0,
        explicacion: "Primero 40% de 200 = 80 estudiantes. Luego 25% de 80 = 20."
    },
    {
        id: "m1-35", temaId: 6, bloque: 3, dificultad: "Aplicación", subtema: "Potencias de base racional",
        enunciado: "¿Cuál es el valor de (−2/3)²?",
        alternativas: ["−4/9", "−4/6", "4/9", "4/6"], correcta: 2,
        explicacion: "Elevamos numerador y denominador al cuadrado: (−2)²/3² = 4/9."
    },
    {
        id: "m1-36", temaId: 6, bloque: 3, dificultad: "Aplicación", subtema: "Propiedades de las potencias",
        enunciado: "Para a ≠ 0, ¿a qué equivale a⁷ ÷ a³?",
        alternativas: ["a²", "a⁴", "a¹⁰", "a²¹"], correcta: 1,
        explicacion: "Al dividir potencias de igual base, restamos exponentes: a⁷ ÷ a³ = a⁽⁷⁻³⁾ = a⁴."
    },
    {
        id: "m1-37", temaId: 7, bloque: 3, dificultad: "Aplicación", subtema: "Descomposición de raíces",
        enunciado: "¿Cuál es la forma simplificada de √180?",
        alternativas: ["3√20", "6√5", "9√2", "10√3"], correcta: 1,
        explicacion: "180 = 36 × 5, entonces √180 = √36 × √5 = 6√5."
    },
    {
        id: "m1-38", temaId: 7, bloque: 3, dificultad: "Aplicación", subtema: "Propiedades",
        enunciado: "¿Cuál es el valor de √9 × √16?",
        alternativas: ["7", "12", "25", "144"], correcta: 1,
        explicacion: "√9 × √16 = 3 × 4 = 12."
    },
    {
        id: "m1-39", temaId: 8, bloque: 3, dificultad: "Aplicación", subtema: "Simplificación",
        enunciado: "¿Cuál es el resultado simplificado de √48 − √12?",
        alternativas: ["√36", "2√3", "3√3", "6√3"], correcta: 1,
        explicacion: "√48 = 4√3 y √12 = 2√3. Al restar, queda 2√3."
    },
    {
        id: "m1-40", temaId: 8, bloque: 3, dificultad: "Aplicación", subtema: "Aplicación en contexto",
        enunciado: "Un patio cuadrado tiene un área de 225 m². ¿Cuántos metros de reja se necesitan para cercarlo por completo?",
        alternativas: ["15 m", "30 m", "60 m", "225 m"], correcta: 2,
        explicacion: "El lado mide √225 = 15 m. El perímetro es 4 × 15 = 60 m."
    },
    {
        id: "m1-41", temaId: 9, bloque: 4, dificultad: "Aplicación", subtema: "Productos notables",
        enunciado: "¿Cuál es el desarrollo de (x − 4)²?",
        alternativas: ["x² − 16", "x² − 8x + 16", "x² + 8x + 16", "x² − 4x + 16"], correcta: 1,
        explicacion: "Usamos (a − b)² = a² − 2ab + b²: x² − 8x + 16."
    },
    {
        id: "m1-42", temaId: 9, bloque: 4, dificultad: "Aplicación", subtema: "Factorización",
        enunciado: "¿Cuál es la factorización de x² − 25?",
        alternativas: ["(x − 5)²", "(x + 5)²", "(x − 5)(x + 5)", "x(x − 25)"], correcta: 2,
        explicacion: "Es una diferencia de cuadrados: x² − 5² = (x − 5)(x + 5)."
    },
    {
        id: "m1-43", temaId: 10, bloque: 4, dificultad: "Aplicación", subtema: "Interpretación de expresiones",
        enunciado: "Una aplicación cobra $900 de inscripción más $250 por cada clase. ¿Qué expresión representa el costo de n clases?",
        alternativas: ["900n + 250", "1.150n", "900 + 250n", "250 + 900n²"], correcta: 2,
        explicacion: "La inscripción es un cobro fijo y cada clase agrega $250: C(n) = 900 + 250n."
    },
    {
        id: "m1-44", temaId: 10, bloque: 4, dificultad: "Aplicación", subtema: "Planteamiento de problemas",
        enunciado: "El triple de un número, disminuido en 4, es 20. ¿Cuál es el número?",
        alternativas: ["6", "8", "12", "24"], correcta: 1,
        explicacion: "Planteamos 3x − 4 = 20. Sumamos 4 y dividimos por 3: x = 8."
    },
    {
        id: "m1-45", temaId: 11, bloque: 4, dificultad: "Aplicación", subtema: "Proporcionalidad directa",
        enunciado: "La distancia recorrida es directamente proporcional al tiempo. Si en 2 horas se recorren 150 km, ¿cuánto se recorre en 5 horas al mismo ritmo?",
        alternativas: ["300 km", "350 km", "375 km", "500 km"], correcta: 2,
        explicacion: "La rapidez constante es 150 ÷ 2 = 75 km/h. En 5 horas se recorren 75 × 5 = 375 km."
    },
    {
        id: "m1-46", temaId: 11, bloque: 4, dificultad: "Aplicación", subtema: "Proporcionalidad inversa",
        enunciado: "Ocho grifos iguales llenan un estanque en 6 horas. ¿Cuánto tardan 12 grifos iguales?",
        alternativas: ["3 horas", "4 horas", "9 horas", "12 horas"], correcta: 1,
        explicacion: "Es inversa: 8 × 6 = 12 × t. Entonces t = 48 ÷ 12 = 4 horas."
    },
    {
        id: "m1-47", temaId: 12, bloque: 4, dificultad: "Aplicación", subtema: "Interpretación de razones",
        enunciado: "La razón entre harina y azúcar en una receta es 3:2. Si se usan 12 tazas de harina, ¿cuántas de azúcar se necesitan?",
        alternativas: ["6", "8", "9", "18"], correcta: 1,
        explicacion: "La harina se multiplicó por 4 (3 × 4 = 12); multiplicamos el azúcar por el mismo factor: 2 × 4 = 8 tazas."
    },
    {
        id: "m1-48", temaId: 12, bloque: 4, dificultad: "Aplicación", subtema: "Aplicaciones en contexto",
        enunciado: "Un mapa usa la escala 1 cm : 5 km. Dos ciudades están separadas por 7 cm en el mapa. ¿Cuál es la distancia real?",
        alternativas: ["12 km", "25 km", "35 km", "70 km"], correcta: 2,
        explicacion: "Cada centímetro representa 5 km. Para 7 cm: 7 × 5 = 35 km."
    },
    {
        id: "m1-49", temaId: 13, bloque: 4, dificultad: "Aplicación", subtema: "Problemas con inecuaciones",
        enunciado: "Para subir a una atracción se exige medir al menos 140 cm. Si Martina mide h cm, ¿qué condición debe cumplir?",
        alternativas: ["h < 140", "h ≤ 140", "h > 140", "h ≥ 140"], correcta: 3,
        explicacion: "'Al menos 140' incluye 140 y cualquier valor mayor: h ≥ 140."
    },
    {
        id: "m1-50", temaId: 13, bloque: 4, dificultad: "Aplicación", subtema: "Inecuaciones",
        enunciado: "¿Cuál es el conjunto solución de 4x + 3 ≤ 15?",
        alternativas: ["x ≤ 3", "x ≥ 3", "x ≤ 4,5", "x ≥ 4,5"], correcta: 0,
        explicacion: "Restamos 3: 4x ≤ 12. Dividimos por 4: x ≤ 3."
    },
    {
        id: "m1-51", temaId: 14, bloque: 4, dificultad: "Aplicación", subtema: "Métodos de resolución",
        enunciado: "¿Cuál es la solución del sistema x + y = 11, x − y = 5?",
        alternativas: ["(3, 8)", "(8, 3)", "(5, 6)", "(11, 5)"], correcta: 1,
        explicacion: "Sumando las ecuaciones, 2x = 16 y x = 8. Sustituyendo, y = 3."
    },
    {
        id: "m1-52", temaId: 14, bloque: 4, dificultad: "Aplicación", subtema: "Problemas en contexto",
        enunciado: "En un cine, 2 entradas de adulto y 1 infantil cuestan $17.000. Una entrada de adulto y 1 infantil cuestan $10.000. ¿Cuánto cuesta la entrada de adulto?",
        alternativas: ["$5.000", "$7.000", "$10.000", "$17.000"], correcta: 1,
        explicacion: "Restamos la segunda compra de la primera: queda una entrada de adulto, que cuesta $17.000 − $10.000 = $7.000."
    },
    {
        id: "m1-53", temaId: 15, bloque: 5, dificultad: "Aplicación", subtema: "Gráficos",
        enunciado: "¿Cuál es la pendiente de la recta que pasa por (1, 4) y (3, 10)?",
        alternativas: ["2", "3", "4", "6"], correcta: 1,
        explicacion: "La pendiente es el cambio en y dividido por el cambio en x: (10 − 4)/(3 − 1) = 6/2 = 3."
    },
    {
        id: "m1-54", temaId: 24, bloque: 7, dificultad: "Aplicación", subtema: "Regla multiplicativa",
        enunciado: "Al lanzar una moneda justa y un dado justo, ¿cuál es la probabilidad de obtener cara y un número par?",
        alternativas: ["1/4", "1/3", "1/2", "3/4"], correcta: 0,
        explicacion: "Los eventos son independientes. P(cara y par) = 1/2 × 3/6 = 1/4."
    },
    {
        id: "m1-55", temaId: 16, bloque: 5, dificultad: "Aplicación", subtema: "Modelación",
        enunciado: "Una aplicación de transporte cobra $700 de base más $180 por kilómetro. ¿Cuál es el costo de un viaje de 8 km?",
        alternativas: ["$1.440", "$2.140", "$5.600", "$7.040"], correcta: 1,
        explicacion: "El modelo es C(k) = 700 + 180k. Para 8 km: 700 + 180 × 8 = $2.140."
    },
    {
        id: "m1-56", temaId: 16, bloque: 5, dificultad: "Aplicación", subtema: "Resolución de problemas",
        enunciado: "Un estanque tiene 90 L y pierde 6 L por minuto. ¿Cuánto tiempo tarda en quedar con 54 L?",
        alternativas: ["6 min", "9 min", "15 min", "24 min"], correcta: 0,
        explicacion: "La cantidad perdida es 90 − 54 = 36 L. A 6 L por minuto, el tiempo es 36 ÷ 6 = 6 minutos."
    },
    {
        id: "m1-57", temaId: 17, bloque: 5, dificultad: "Aplicación", subtema: "Vértice",
        enunciado: "¿Cuál es el vértice de la parábola y = (x − 2)² + 3?",
        alternativas: ["(−2, 3)", "(2, 3)", "(3, 2)", "(2, −3)"], correcta: 1,
        explicacion: "En la forma y = (x − h)² + k, el vértice es (h, k). Por tanto, es (2, 3)."
    },
    {
        id: "m1-58", temaId: 17, bloque: 5, dificultad: "Aplicación", subtema: "Intersecciones",
        enunciado: "¿En qué punto la gráfica y = x² + 2x − 3 intersecta el eje y?",
        alternativas: ["(−3, 0)", "(0, −3)", "(0, 2)", "(3, 0)"], correcta: 1,
        explicacion: "En el eje y, x = 0. Entonces y = 0² + 2 × 0 − 3 = −3; el punto es (0, −3)."
    },
    {
        id: "m1-59", temaId: 18, bloque: 5, dificultad: "Aplicación", subtema: "Aplicaciones en contexto",
        enunciado: "La altura de una pelota está dada por h(t) = −t² + 8t. ¿Cuál es su altura máxima?",
        alternativas: ["8 m", "16 m", "32 m", "64 m"], correcta: 1,
        explicacion: "El máximo está en el vértice: t = −8/(2 × −1) = 4 s. Evaluando, h(4) = −16 + 32 = 16 m."
    },
    {
        id: "m1-60", temaId: 19, bloque: 6, dificultad: "Aplicación", subtema: "Áreas",
        enunciado: "Un jardín rectangular mide 9 m de largo y 4 m de ancho. ¿Cuál es su área?",
        alternativas: ["13 m²", "26 m²", "36 m²", "72 m²"], correcta: 2,
        explicacion: "El área del rectángulo es largo × ancho: 9 × 4 = 36 m²."
    },
    {
        id: "m1-61", temaId: 20, bloque: 6, dificultad: "Aplicación", subtema: "Área de superficies",
        enunciado: "Un cubo tiene aristas de 3 cm. ¿Cuál es el área total de sus caras?",
        alternativas: ["27 cm²", "36 cm²", "54 cm²", "81 cm²"], correcta: 2,
        explicacion: "Cada cara tiene área 3² = 9 cm² y el cubo tiene 6 caras. Área total: 6 × 9 = 54 cm²."
    },
    {
        id: "m1-62", temaId: 21, bloque: 6, dificultad: "Aplicación", subtema: "Traslación y plano cartesiano",
        enunciado: "El punto P(−2, 3) se traslada con el vector (5, −4). ¿Cuáles son las coordenadas de su imagen?",
        alternativas: ["(−7, 7)", "(3, −1)", "(3, 7)", "(−10, −12)"], correcta: 1,
        explicacion: "Sumamos el vector a las coordenadas: (−2 + 5, 3 − 4) = (3, −1)."
    },
    {
        id: "m1-63", temaId: 22, bloque: 7, dificultad: "Aplicación", subtema: "Tablas de frecuencia",
        enunciado: "En una tabla, los valores 1, 2 y 3 tienen frecuencias 2, 3 y 1, respectivamente. ¿Cuántos datos hay en total y cuál es su media?",
        alternativas: ["6 datos y media 1,5", "6 datos y media 11/6", "3 datos y media 2", "6 datos y media 2"], correcta: 1,
        explicacion: "Hay 2 + 3 + 1 = 6 datos. La media ponderada es (1×2 + 2×3 + 3×1)/6 = 11/6."
    },
    {
        id: "m1-64", temaId: 23, bloque: 7, dificultad: "Aplicación", subtema: "Cuartiles y diagrama de caja",
        enunciado: "En un conjunto de datos, Q1 = 8, la mediana es 12 y Q3 = 18. ¿Cuál es el rango intercuartílico?",
        alternativas: ["4", "6", "10", "18"], correcta: 2,
        explicacion: "El rango intercuartílico es Q3 − Q1 = 18 − 8 = 10."
    }
];

function obtenerPreguntasPorBloque(bloque) {
    return preguntasM1.filter((pregunta) => pregunta.bloque === Number(bloque));
}