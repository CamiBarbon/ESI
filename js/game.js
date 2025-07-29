const BOARD_SIZE = 40;
const QUESTIONS = [
  {
    q: "¿Qué significa ESI?",
    a: ["Educación Sexual Integral", "Energía Solar Internacional", "Escuela de Seguridad Infantil"],
    correct: 0
  },
  {
    q: "¿ESI es un derecho?",
    a: ["Sí", "No", "Solo en primaria"],
    correct: 0
  },
  {
    q: "¿Cuándo se sancionó la Ley de ESI?",
    a: ["2006", "2012", "1998"],
    correct: 0
  },
  // Agregar más preguntas aquí...
];

let players = [];
let currentPlayer = 0;

document.getElementById("playerForm").addEventListener("submit", e => {
  e.preventDefault();

  const inputs = document.querySelectorAll(".player-inputs > div");
  players = Array.from(inputs)
    .map(div => {
      const name = div.querySelector("input").value.trim();
      const avatar = div.querySelector("select").value;
      return { name, avatar, position: 0, score: 0 };
    })
    .filter(p => p.name !== "");

  if (players.length < 2) {
    alert("Necesitás al menos 2 jugadores con nombre.");
    return;
  }

  document.getElementById("players-setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  drawBoard();
  updateTurn();
  loadRanking();
});

function drawBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < BOARD_SIZE; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    board.appendChild(cell);
  }
  updatePlayersOnBoard();
}

function updatePlayersOnBoard() {
  document.querySelectorAll(".cell").forEach(c => (c.innerHTML = ""));
  players.forEach(player => {
    const cell = document.querySelector(`.cell[data-index="${player.position}"]`);
    if (cell) cell.innerHTML += `<span class="avatar">${player.avatar}</span>`;
  });
}

function updateTurn() {
  document.getElementById("currentPlayerName").textContent = players[currentPlayer].name;
}

document.getElementById("rollDice").addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").textContent = roll;

  const player = players[currentPlayer];
  player.position = Math.min(player.position + roll, BOARD_SIZE - 1);

  updatePlayersOnBoard();

  showQuestion(player);
});

function showQuestion(player) {
  const modal = document.getElementById("question");
  const questionText = document.getElementById("questionText");
  const answers = document.getElementById("answers");

  if (QUESTIONS.length === 0) {
    questionText.textContent = "No hay preguntas disponibles.";
    answers.innerHTML = "";
    return;
  }

  const question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

  modal.classList.remove("hidden");
  questionText.textContent = question.q;
  answers.innerHTML = "";

  question.a.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("btn", "btn-warning", "m-2");
    btn.onclick = () => {
      if (index === question.correct) {
        player.score++;
      }

      modal.classList.add("hidden");

      if (player.position === BOARD_SIZE - 1) {
        alert(`${player.name} ganó con ${player.score} respuestas correctas 🎉`);
        saveScore(player);
        location.reload();
      } else {
        currentPlayer = (currentPlayer + 1) % players.length;
        updateTurn();
      }
    };
    answers.appendChild(btn);
  });
}

document.getElementById("closeQuestion").addEventListener("click", () => {
  document.getElementById("question").classList.add("hidden");
  currentPlayer = (currentPlayer + 1) % players.length;
  updateTurn();
});

function saveScore(player) {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name: player.name, score: player.score });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 5)));
  loadRanking();
}

function loadRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  const list = document.getElementById("rankingList");

  list.innerHTML = ranking
    .map(
      (r, i) =>
        `<li style="background: pastel; border-radius:50%; padding:10px; margin:5px; list-style:none; background: ${
          ["#fcf26a", "#b0f086", "#62fcb4", "#7ffaf0", "#c2cbf5"][i] || "#eee"
        }">
          <strong>${r.name}</strong> - ${r.score} pts
        </li>`
    )
    .join("");
}
