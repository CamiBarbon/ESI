const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    const lista = document.getElementById("ranking");
    ranking.slice().reverse().forEach((nombre, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${nombre}`;
      lista.appendChild(li);
    });