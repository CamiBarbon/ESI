let tablero = document.getElementById("tablero");
let fichasContainer = document.getElementById("fichas");
let dadoBtn = document.getElementById("tirar-dado");
let resultadoDado = document.getElementById("resultado-dado");
let preguntaCont = document.getElementById("pregunta");
let textoPregunta = document.getElementById("texto-pregunta");
let opcionesCont = document.getElementById("opciones");
let turnoSpan = document.getElementById("turno-actual");
let pantallaInicio = document.getElementById("pantalla-inicio");
let pantallaJugadores = document.getElementById("pantalla-jugadores");
let pantallaJuego = document.getElementById("pantalla-juego");
let pantallaGanador = document.getElementById("pantalla-ganador");
let nombreGanador = document.getElementById("nombre-ganador");
let formJugadores = document.getElementById("form-jugadores");

let tableroPos = [
  { x: 27, y: 493 }, { x: 52, y: 426 }, { x: 52, y: 364 },
  { x: 52, y: 289 }, { x: 52, y: 222 }, { x: 51, y: 143 },
  { x: 55, y: 59 }, { x: 129, y: 52 }, { x: 201, y: 58 },
  { x: 265, y: 53 }, { x: 329, y: 64 }, { x: 400, y: 57 },
  { x: 470, y: 72 }, { x: 462, y: 150 }, { x: 471, y: 239 },
  { x: 469, y: 329 }, { x: 466, y: 417 }, { x: 383, y: 411 },
  { x: 297, y: 408 }, { x: 222, y: 414 }, { x: 144, y: 415 },
  { x: 120, y: 349 }, { x: 118, y: 261 }, { x: 120, y: 164 },
  { x: 183, y: 141 }, { x: 254, y: 140 }, { x: 322, y: 148 },
  { x: 392, y: 141 }, { x: 398, y: 202 }, { x: 394, y: 263 },
  { x: 390, y: 326 }, { x: 316, y: 321 }, { x: 250, y: 325 },
  { x: 186, y: 318 }, { x: 187, y: 238 }, { x: 247, y: 235 },
  { x: 316, y: 231 }
];

let acciones = {
  2: { tipo: "suerte", destino: 21 },
  5: { tipo: "pierde" },
  7: { tipo: "suerte", destino: 11 },
  12: { tipo: "reinicia" },
  14: { tipo: "suerte", destino: 29 },
  18: { tipo: "pierde" },
  22: { tipo: "avanza", cantidad: 2 },
  25: { tipo: "retrocede", destino: 9 },
  30: { tipo: "retrocede", destino: 27 },
  31: { tipo: "tira" },
  33: { tipo: "retrocede", destino: 20 }
};

let jugadores = [];
let posJugador = [];
let turno = 0;
let preguntas = [];
let esperando = false;

let basePreg = [
{ pregunta: "¿Qué ley establece la ESI en Argentina?", opciones: ["Ley 26.150", "Ley 24.193", "Ley 25.250"], correcta: "Ley 26.150" },
  { pregunta: "¿Qué eje promueve la valoración de la afectividad?", opciones: ["Ejercer derechos", "Cuidar el cuerpo", "Respetar la diversidad"], correcta: "Valorar la afectividad" },
  { pregunta: "¿Qué eje ESI incluye aprender sobre salud y autocuidado?", opciones: ["Ejercer derechos", "Cuidar el cuerpo", "Respetar la diversidad"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿Qué ley establece el derecho a recibir ESI en todas las escuelas?", opciones: ["Ley 26.150", "Ley 27.610", "Ley 23.849"], correcta: "Ley 26.150" },
  { pregunta: "¿Cuál es un objetivo de la ESI?", opciones: ["Fomentar la ignorancia", "Promover el respeto", "Imponer una religión"], correcta: "Promover el respeto" },
  { pregunta: "¿Qué eje incluye conocer los derechos sexuales y reproductivos?", opciones: ["Ejercer derechos", "Respetar la diversidad", "Valorar la afectividad"], correcta: "Ejercer derechos" },
  { pregunta: "¿Qué promueve la ESI?", opciones: ["Información falsa", "Autonomía y libertad", "Discriminación"], correcta: "Autonomía y libertad" },
  { pregunta: "¿Cuál de estos NO es un eje de la ESI?", opciones: ["Educar la voz", "Ejercer derechos", "Respetar la diversidad"], correcta: "Educar la voz" },
  { pregunta: "¿Qué eje ESI se relaciona con conocer el cuerpo?", opciones: ["Cuidar el cuerpo", "Respetar la diversidad", "Valorar la afectividad"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿Qué significa ESI?", opciones: ["Educación Sencilla Infantil", "Educación Sexual Integral", "Educación Social Interactiva"], correcta: "Educación Sexual Integral" },
  { pregunta: "¿Desde qué nivel educativo se aplica la ESI?", opciones: ["Solo secundaria", "Todos los niveles", "Solo primaria"], correcta: "Todos los niveles" },
  { pregunta: "¿Qué eje ESI fomenta el respeto por distintas identidades?", opciones: ["Cuidar el cuerpo", "Respetar la diversidad", "Valorar la afectividad"], correcta: "Respetar la diversidad" },
  { pregunta: "¿Qué derecho garantiza la ESI?", opciones: ["Derecho al juego", "Derecho a la educación", "Derecho a una sexualidad informada"], correcta: "Derecho a una sexualidad informada" },
  { pregunta: "¿Qué se necesita para ejercer derechos?", opciones: ["Tener información", "Tener miedo", "No preguntar"], correcta: "Tener información" },
  { pregunta: "¿Qué eje se relaciona con los vínculos afectivos?", opciones: ["Respetar la diversidad", "Valorar la afectividad", "Cuidar el cuerpo"], correcta: "Valorar la afectividad" },
  { pregunta: "¿Qué eje promueve la igualdad de género?", opciones: ["Ejercer derechos", "Respetar la diversidad", "Valorar la afectividad"], correcta: "Respetar la diversidad" },
  { pregunta: "¿La ESI solo se trata de biología?", opciones: ["Sí", "No", "Solo en secundaria"], correcta: "No" },
  { pregunta: "¿La ESI se adapta a cada edad?", opciones: ["No", "Sí", "Solo en primaria"], correcta: "Sí" },
  { pregunta: "¿Qué eje habla de tomar decisiones responsables?", opciones: ["Valorar la afectividad", "Ejercer derechos", "Cuidar el cuerpo"], correcta: "Ejercer derechos" },
  { pregunta: "¿Qué es un consentimiento informado?", opciones: ["Decidir con miedo", "Decidir con información", "Decidir por impulso"], correcta: "Decidir con información" },
  { pregunta: "¿Qué promueve la ESI en los vínculos?", opciones: ["Manipulación", "Respeto mutuo", "Secretos"], correcta: "Respeto mutuo" },
  { pregunta: "¿Qué eje se relaciona con prevenir abusos?", opciones: ["Cuidar el cuerpo", "Respetar la diversidad", "Valorar la afectividad"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿Quiénes deben recibir ESI?", opciones: ["Solo adolescentes", "Estudiantes de todos los niveles", "Solo adultos"], correcta: "Estudiantes de todos los niveles" },
  { pregunta: "¿La ESI impone ideología?", opciones: ["Sí", "No", "A veces"], correcta: "No" },
  { pregunta: "¿Qué permite la ESI frente a estereotipos?", opciones: ["Reproducirlos", "Cuestionarlos", "Negarlos"], correcta: "Cuestionarlos" },
  { pregunta: "¿Qué se trabaja en ESI sobre identidad?", opciones: ["Ocultarla", "Expresarla con libertad", "Negarla"], correcta: "Expresarla con libertad" },
  { pregunta: "¿Qué eje incluye aprender a decir 'no'?", opciones: ["Cuidar el cuerpo", "Valorar la afectividad", "Respetar la diversidad"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿ESI fomenta...?", opciones: ["Silencio", "Reflexión crítica", "Ignorancia"], correcta: "Reflexión crítica" },
  { pregunta: "¿Qué ley garantiza que la ESI sea obligatoria?", opciones: ["Ley 25.245", "Ley 26.150", "Ley 24.193"], correcta: "Ley 26.150" },
  { pregunta: "¿ESI respeta la diversidad?", opciones: ["Sí", "No", "A veces"], correcta: "Sí" },
  { pregunta: "¿Qué eje incluye conocer emociones?", opciones: ["Valorar la afectividad", "Ejercer derechos", "Respetar la diversidad"], correcta: "Valorar la afectividad" },
  { pregunta: "¿ESI reemplaza el rol de las familias?", opciones: ["Sí", "No", "Depende"], correcta: "No" },
  { pregunta: "¿Qué promueve la ESI?", opciones: ["Estereotipos", "Información, derechos y respeto", "Ignorancia"], correcta: "Información, derechos y respeto" },
  { pregunta: "¿Qué eje trabaja la empatía?", opciones: ["Valorar la afectividad", "Cuidar el cuerpo", "Ejercer derechos"], correcta: "Valorar la afectividad" },
  { pregunta: "¿Qué eje enseña a cuidar la salud?", opciones: ["Cuidar el cuerpo", "Respetar la diversidad", "Valorar la afectividad"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿La ESI enseña sobre género?", opciones: ["Sí", "No", "Depende"], correcta: "Sí" },
  { pregunta: "¿Qué significa ejercer derechos?", opciones: ["Informarse y actuar", "No preguntar", "Quedarse callado"], correcta: "Informarse y actuar" },
  { pregunta: "¿Qué eje ayuda a reconocer situaciones de riesgo?", opciones: ["Cuidar el cuerpo", "Respetar la diversidad", "Ejercer derechos"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿Qué garantiza la ESI?", opciones: ["Desinformación", "Acceso a información y respeto", "Ideología"], correcta: "Acceso a información y respeto" },
  { pregunta: "¿Quién puede enseñar ESI?", opciones: ["Sólo médicos", "Docentes de todas las áreas", "Solo tutores"], correcta: "Docentes de todas las áreas" },
  { pregunta: "¿Qué se trabaja en la ESI sobre vínculos?", opciones: ["Violencia", "Respeto y cuidado", "Sumisión"], correcta: "Respeto y cuidado" },
  { pregunta: "¿Qué eje enseña a expresar sentimientos?", opciones: ["Valorar la afectividad", "Respetar la diversidad", "Cuidar el cuerpo"], correcta: "Valorar la afectividad" },
  { pregunta: "¿Qué se busca con la ESI?", opciones: ["Autonomía, respeto y conciencia", "Confusión", "Silencio"], correcta: "Autonomía, respeto y conciencia" },
  { pregunta: "¿Qué eje promueve romper estereotipos?", opciones: ["Respetar la diversidad", "Ejercer derechos", "Cuidar el cuerpo"], correcta: "Respetar la diversidad" },
  { pregunta: "¿ESI fomenta decisiones informadas?", opciones: ["Sí", "No", "Nunca"], correcta: "Sí" },
  { pregunta: "¿Qué derecho tienen les estudiantes?", opciones: ["Recibir información científica", "No aprender", "Confundirse"], correcta: "Recibir información científica" },
  { pregunta: "¿Qué eje ayuda a reconocer abusos?", opciones: ["Cuidar el cuerpo", "Valorar la afectividad", "Ejercer derechos"], correcta: "Cuidar el cuerpo" },
  { pregunta: "¿Qué eje incluye diversidad corporal?", opciones: ["Respetar la diversidad", "Ejercer derechos", "Valorar la afectividad"], correcta: "Respetar la diversidad" },
  { pregunta: "¿Qué eje trabaja los vínculos sanos?", opciones: ["Valorar la afectividad", "Cuidar el cuerpo", "Respetar la diversidad"], correcta: "Valorar la afectividad" }
];

while (preguntas.length < 50) {
  preguntas.push(basePreg[Math.floor(Math.random() * basePreg.length)]);
}


function iniciarJuego() {
  jugadores.forEach((j, i) => {
    let div = document.createElement("div");
    div.className = "ficha";
    div.textContent = j.avatar;
    div.id = `ficha${i}`;
    fichasContainer.appendChild(div);
    posJugador[i] = 0;
    let [x,y] = escalar(0);
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
  });
  turno = 0;
  turnoSpan.textContent = jugadores[0].nombre;
  dadoBtn.disabled = false;
}

dadoBtn.onclick = () => {
  if (esperando) return;
  dadoBtn.disabled = true;
  let dado = Math.floor(Math.random()*6)+1;
  resultadoDado.textContent = `Sacaste un ${dado}`;
  let nueva = posJugador[turno]+dado;
  if (nueva >= tableroPos.length) {
    nombreGanador.textContent = jugadores[turno].nombre;
    pantallaJuego.classList.add("oculto");
    pantallaGanador.classList.remove("oculto");
    localStorage.setItem("ranking", JSON.stringify([jugadores[turno].nombre]));
    return;
  }
  gestionarCasilla(nueva);
};

function gestionarCasilla(nueva) {
  let acc = acciones[nueva];
  if (acc) {
    if (acc.tipo === "pierde") {
      alert("Perdés el próximo turno");
      nextTurn();
    } else if (acc.tipo === "reinicia") {
      posJugador[turno] = 0;
      moverFicha(0);
      nextTurn();
    } else if (acc.tipo === "suerte" || acc.tipo === "retrocede") {
      posJugador[turno] = acc.destino;
      moverFicha(acc.destino);
      nextTurn();
    } else if (acc.tipo === "avanza") {
      posJugador[turno] += acc.cantidad;
      moverFicha(posJugador[turno]);
      nextTurn();
    } else if (acc.tipo === "tira") {
      moverFicha(nueva);
      posJugador[turno] = nueva;
      dadoBtn.disabled = false;
    }
  } else {
    pedirPregunta(nueva);
  }
}

function moverFicha(casilla) {
  posJugador[turno] = casilla;
  let ficha = document.getElementById(`ficha${turno}`);
  let [x,y] = escalar(casilla);
  ficha.style.left = `${x}px`;
  ficha.style.top = `${y}px`;
}

function pedirPregunta(casilla) {
  esperando = true;
  let p = preguntas[Math.floor(Math.random()*preguntas.length)];
  preguntaCont.classList.remove("oculto");
  textoPregunta.textContent = p.pregunta;
  opcionesCont.innerHTML = "";
  p.opciones.forEach((opt,i) => {
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2";
    btn.textContent = opt;
    btn.onclick = () => {
      if (i === p.correcta) {
        alert("✅ Correcto, avanzás");
        moverFicha(casilla);
      } else {
        alert("❌ Incorrecto, no avanzás");
      }
      preguntaCont.classList.add("oculto");
      esperando = false;
      nextTurn();
    };
    opcionesCont.appendChild(btn);
  });
}

function nextTurn() {
  turno = (turno+1)%jugadores.length;
  turnoSpan.textContent = jugadores[turno].nombre;
  dadoBtn.disabled = false;
}

document.getElementById("confirmar-cantidad").onclick = () => {
  let qty = parseInt(document.getElementById("cantidad").value);
  formJugadores.innerHTML = "";
  for (let i=0;i<qty;i++){
    formJugadores.innerHTML += `
      <div class="mb-2">
        <input type="text" placeholder="Nombre jugador ${i+1}" required id="n${i}" class="form-control" />
        <select id="a${i}" class="form-select">
          <option>🐸</option><option>🐱</option><option>🦊</option><option>🐻</option>
        </select>
      </div>`;
  }
  pantallaInicio.classList.add("oculto");
  pantallaJugadores.classList.remove("oculto");
};

document.getElementById("comenzar-juego").onclick = () => {
  jugadores = [];
  let qty = formJugadores.children.length;
  for (let i=0;i<qty;i++){
    const nombre = document.getElementById(`n${i}`).value;
    const avatar = document.getElementById(`a${i}`).value;
    if (!nombre) { alert("Nombre requerido"); return; }
    jugadores.push({ nombre, avatar });
  }
  pantallaJugadores.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    pantallaJuego.innerHTML = "<p>📱 Este juego es para escritorio (PC).</p>";
  } else {
    iniciarJuego();
  }
};
