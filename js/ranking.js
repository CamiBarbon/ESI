let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
let lista = document.getElementById("ranking");

ranking.forEach((nombre, i) => {
  let li = document.createElement("li");
  li.textContent = `${i + 1}. ${nombre}`;
  lista.appendChild(li);
});