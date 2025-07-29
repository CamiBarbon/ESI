const AVATARS = ['👾', '🐸', '🐱', '🦄', '🐍', '🐙'];
const MAX_PLAYERS = 4;

document.addEventListener("DOMContentLoaded", () => {
  const playerInputs = document.querySelector(".player-inputs");

  for (let i = 0; i < MAX_PLAYERS; i++) {
    const div = document.createElement("div");
    div.classList.add("player-block");
    div.innerHTML = `
      <input type="text" placeholder="Nombre jugador ${i + 1}" ${i >= 2 ? 'disabled' : ''} required />
      <select ${i >= 2 ? 'disabled' : ''}>
        ${AVATARS.map(a => `<option value="${a}">${a}</option>`).join("")}
      </select>
      ${i >= 2 ? `<button type="button" class="enable-btn">➕</button>` : ""}
    `;
    playerInputs.appendChild(div);
  }

  document.querySelectorAll(".enable-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      parent.querySelector("input").disabled = false;
      parent.querySelector("select").disabled = false;
      btn.remove();
    });
  });
});