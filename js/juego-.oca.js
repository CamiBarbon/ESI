const tablero = document.getElementById("tablero");
const fichasContainer = document.getElementById("fichas");
const dadoBtn = document.getElementById("tirar-dado");
const resultadoDado = document.getElementById("resultado-dado");
const preguntaCont = document.getElementById("pregunta");
const textoPregunta = document.getElementById("texto-pregunta");
const opcionesCont = document.getElementById("opciones");
const turnoSpan = document.getElementById("turno-actual");
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJugadores = document.getElementById("pantalla-jugadores");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaGanador = document.getElementById("pantalla-ganador");
const nombreGanador = document.getElementById("nombre-ganador");
const formJugadores = document.getElementById("form-jugadores");

let jugadores = [];
let posiciones = [];
let turno = 0;
let esperandoRespuesta = false;

// Coordenadas proporcionales (valores relativos de izquierda y arriba)
const coordenadas = [
  [0.04, 0.92], [0.12, 0.92], [0.20, 0.92], [0.28, 0.92], [0.36, 0.92],
  [0.44, 0.92], [0.52, 0.92], [0.60, 0.92], [0.68, 0.92], [0.76, 0.92],
  [0.84, 0.92], [0.92, 0.92], [0.92, 0.84], [0.92, 0.76], [0.84, 0.76],
  [0.76, 0.76], [0.68, 0.76], [0.60, 0.76], [0.52, 0.76], [0.44, 0.76],
  [0.36, 0.76], [0.28, 0.76], [0.20, 0.76], [0.12, 0.76], [0.04, 0.76],
  [0.04, 0.68], [0.12, 0.68], [0.20, 0.68], [0.28, 0.68], [0.36, 0.68],
  [0.44, 0.68], [0.52, 0.68], [0.60, 0.68], [0.68, 0.68], [0.76, 0.68],
  [0.84, 0.68]
];

const acciones = {
  2: { tipo: "suerte", destino: 21 },
  5: { tipo: "pierde_turno" },
  7: { tipo: "estrella", destino: 11 },
  12: { tipo: "reinicia" },
  14: { tipo: "suerte", destino: 29 },
  18: { tipo: "pierde_turno" },
  22: { tipo: "avanza", valor: 2 },
  25: { tipo: "mala_suerte", destino: 9 },
  30: { tipo: "retrocede", destino: 27 },
  31: { tipo: "tira_de_nuevo" },
  33: { tipo: "mala_suerte", destino: 20 }
};

const preguntas = [
  {
    texto: "¿Qué es la ESI?",
    opciones: ["Educación Sexual Integral", "Educación Social Infantil", "Escuela Sin Igual"],
    correcta: 0
  },
  {
    texto: "¿Desde qué año es obligatoria la ESI en Argentina?",
    opciones: ["2010", "2006", "2001"],
    correcta: 1
  },
  {
    texto: "¿Cuál de estos es un derecho?",
    opciones: ["Recibir información", "Ser castigado", "Ser ignorado"],
    correcta: 0
  }
  // Agregá más hasta llegar a 50
];

function iniciarJuego() {
  jugadores.forEach((jugador, i) => {
    const ficha = document.createElement("div");
    ficha.className = "ficha";
    ficha.innerText = jugador.avatar;
    ficha.id = `ficha-${i}`;
    fichasContainer.appendChild(ficha);
    posiciones[i] = 0;
    moverFicha(i, 0);
  });
  actualizarTurno();
}

function moverFicha(jugador, casilla) {
  const ficha = document.getElementById(`ficha-${jugador}`);
  const [relX, relY] = coordenadas[casilla];
  const boardWidth = tablero.offsetWidth;
  const boardHeight = tablero.offsetHeight;
  ficha.style.left = `${relX * boardWidth}px`;
  ficha.style.top = `${relY * boardHeight}px`;
}

function actualizarTurno() {
  turnoSpan.textContent = jugadores[turno].nombre;
}

function lanzarDado() {
  if (esperandoRespuesta) return;
  const valor = Math.floor(Math.random() * 6) + 1;
  resultadoDado.textContent = `Sacaste un ${valor}`;
  let nuevaPos = posiciones[turno] + valor;
  if (nuevaPos >= coordenadas.length - 1) {
    pantallaJuego.classList.add("oculto");
    pantallaGanador.classList.remove("oculto");
    nombreGanador.textContent = jugadores[turno].nombre;
    localStorage.setItem(jugadores[turno].nombre, valor);
    setTimeout(() => window.location.href = "aula/ranking.html", 2000);
    return;
  }
  manejarCasilla(nuevaPos);
}

function manejarCasilla(casilla) {
  const accion = acciones[casilla];
  if (accion) {
    switch (accion.tipo) {
      case "suerte":
      case "estrella":
      case "mala_suerte":
      case "retrocede":
        posiciones[turno] = accion.destino;
        moverFicha(turno, accion.destino);
        avanzarTurno();
        break;
      case "avanza":
        posiciones[turno] += accion.valor;
        moverFicha(turno, posiciones[turno]);
        avanzarTurno();
        break;
      case "pierde_turno":
        avanzarTurno(2);
        break;
      case "tira_de_nuevo":
        break; // el jugador repite
      case "reinicia":
        posiciones[turno] = 0;
        moverFicha(turno, 0);
        avanzarTurno();
        break;
    }
  } else {
    mostrarPregunta(casilla);
  }
}

function mostrarPregunta(casilla) {
  esperandoRespuesta = true;
  const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
  preguntaCont.classList.remove("oculto");
  textoPregunta.textContent = pregunta.texto;
  opcionesCont.innerHTML = "";
  pregunta.opciones.forEach((op, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2";
    btn.textContent = op;
    btn.onclick = () => {
      if (idx === pregunta.correcta) {
        alert("✅ ¡Correcto!");
        posiciones[turno] = casilla;
        moverFicha(turno, casilla);
      } else {
        alert("❌ Incorrecto. No avanzás.");
      }
      preguntaCont.classList.add("oculto");
      esperandoRespuesta = false;
      avanzarTurno();
    };
    opcionesCont.appendChild(btn);
  });
}

function avanzarTurno(salto = 1) {
  turno = (turno + salto) % jugadores.length;
  actualizarTurno();
}

document.getElementById("confirmar-cantidad").onclick = () => {
  const cant = parseInt(document.getElementById("cantidad").value);
  formJugadores.innerHTML = "";
  for (let i = 0; i < cant; i++) {
    formJugadores.innerHTML += `
      <div>
        <input type="text" placeholder="Nombre jugador ${i + 1}" required id="nombre-${i}" />
        <select id="avatar-${i}">
          <option value="🐸">🐸</option>
          <option value="🐱">🐱</option>
          <option value="🦄">🦄</option>
          <option value="🐙">🐙</option>
        </select>
      </div>
    `;
  }
  pantallaInicio.classList.add("oculto");
  pantallaJugadores.classList.remove("oculto");
};

document.getElementById("comenzar-juego").onclick = () => {
  jugadores = [];
  const cant = formJugadores.children.length;
  for (let i = 0; i < cant; i++) {
    const nombre = document.getElementById(`nombre-${i}`).value;
    const avatar = document.getElementById(`avatar-${i}`).value;
    if (!nombre) {
      alert("Todos los jugadores deben tener nombre");
      return;
    }
    jugadores.push({ nombre, avatar });
  }
  pantallaJugadores.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  iniciarJuego();
};

dadoBtn.onclick = lanzarDado;
