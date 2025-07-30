const noticias = [
  {
    id: 1,
    titulo: "Crimen pasional sacude al barrio",
    copete: "Una tragedia en el sur de la ciudad",
    desarrollo: "Una mujer fue hallada sin vida. La policía investiga.",
    imagen: "img/noticia1.jpg"
  },
  {
    id: 2,
    titulo: "Docente acusado de abuso continúa trabajando",
    copete: "Familias reclaman medidas urgentes",
    desarrollo: "El acusado niega las denuncias, pero continúa en funciones.",
    imagen: "img/noticia2.jpg"
  },
  {
    id: 3,
    titulo: "Menor se viste provocativa",
    copete: "El debate sobre los límites vuelve a surgir",
    desarrollo: "Una alumna generó polémica por su forma de vestir.",
    imagen: "img/noticia3.jpg"
  },
  {
    id: 4,
    titulo: "Alumno trans cambia su nombre en clase",
    copete: "Controversia en la escuela secundaria local",
    desarrollo: "Padres piden explicación sobre la identidad de género.",
    imagen: "img/noticia4.jpg"
  },
  {
    id: 5,
    titulo: "Joven madre abandona a su bebé",
    copete: "El caso conmueve a la comunidad",
    desarrollo: "Vecinos encontraron al bebé en una plaza.",
    imagen: "img/noticia5.jpg"
  },
  {
    id: 6,
    titulo: "Chicos varones no lloran",
    copete: "Viejos mandatos en nuevas generaciones",
    desarrollo: "Un docente fue criticado por decirlo en clase.",
    imagen: "img/noticia6.jpg"
  },
  {
    id: 7,
    titulo: "Adolescente queda embarazada y deja el colegio",
    copete: "Crecen los casos en la región",
    desarrollo: "La escuela asegura brindar contención, pero no alcanza.",
    imagen: "img/noticia7.jpg"
  },
  {
    id: 8,
    titulo: "Alumnos hacen burla a compañero gay",
    copete: "Un caso más de bullying",
    desarrollo: "Padres exigen protocolos de protección escolar.",
    imagen: "img/noticia8.jpg"
  }
];

let noticiaActual = null;

window.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("noticiasContainer")) {
    cargarMosaicoNoticias();
  }
  if (document.getElementById("carruselContenido")) {
    cargarDiariosGuardados();
    agregarBtnVolverGaleria();
  }
});

function cargarMosaicoNoticias() {
  const container = document.getElementById("noticiasContainer");
  noticias.forEach((noticia, i) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="noticia-portada" onclick="seleccionarNoticia(${i})" style="cursor:pointer">
        <img src="${noticia.imagen}" alt="Imagen noticia ${i + 1}" class="img-fluid"/>
        <h5 class="titulo-portada">${noticia.titulo}</h5>
        <p class="copete">${noticia.copete}</p>
      </div>
    `;
    container.appendChild(col);
  });
}

function seleccionarNoticia(index) {
  noticiaActual = { ...noticias[index] };
  mostrarDiario();
}

function mostrarDiario() {
  document.getElementById("mosaicoNoticias").classList.add("d-none");
  document.getElementById("vistaDiario").classList.remove("d-none");
  document.getElementById("imagenDiario").src = noticiaActual.imagen;
  document.getElementById("tituloDiario").innerText = noticiaActual.titulo;
  document.getElementById("copeteDiario").innerText = noticiaActual.copete;
  document.getElementById("desarrolloDiario").innerText = noticiaActual.desarrollo;
  document.getElementById("finalizarEdicionBtn").disabled = false;
  document.getElementById("finalizarEdicionBtn").textContent = "Finalizar edición";
}

function mostrarEditor() {
  document.getElementById("editorCol").classList.remove("d-none");
  document.getElementById("inputTitulo").value = noticiaActual.titulo;
  document.getElementById("inputCopete").value = noticiaActual.copete;
  document.getElementById("inputDesarrollo").value = noticiaActual.desarrollo;
}

function finalizarEdicion() {
  noticiaActual.titulo = document.getElementById("inputTitulo").value;
  noticiaActual.copete = document.getElementById("inputCopete").value;
  noticiaActual.desarrollo = document.getElementById("inputDesarrollo").value;
  mostrarDiario();
  alert("Noticia editada con éxito");
  const btn = document.getElementById("finalizarEdicionBtn");
  btn.disabled = true;
  btn.textContent = "Edición finalizada";
}

function guardarDiario() {
  const nombre = prompt("Ingresá tu nombre:");
  const edad = prompt("Ingresá tu edad:");
  if (!nombre || !edad) return;
  const diariosGuardados = JSON.parse(localStorage.getItem("diarios")) || [];
  const diario = {
    usuario: nombre,
    edad: edad,
    fecha: new Date().toLocaleDateString(),
    noticia: noticiaActual
  };
  diariosGuardados.push(diario);
  localStorage.setItem("diarios", JSON.stringify(diariosGuardados));
  window.location.href = "galeria.html";
}

function volverInicio() {
  noticiaActual = null;
  document.getElementById("editorCol").classList.add("d-none");
  document.getElementById("vistaDiario").classList.add("d-none");
  document.getElementById("mosaicoNoticias").classList.remove("d-none");
}

function cargarDiariosGuardados() {
  const diarios = JSON.parse(localStorage.getItem("diarios")) || [];
  diarios.forEach(agregarDiarioAlCarrusel);
}


function agregarBtnVolverGaleria() {
  const btn = document.createElement("button");
  btn.className = "btn btn-outline-secondary m-3";
  btn.textContent = "Volver al inicio";
  btn.onclick = () => window.location.href = "index.html";
  document.body.appendChild(btn);
}
// Función para agregar un diario al carrusel (con estilos igual que en el mosaico)
function agregarDiarioAlCarrusel(data) {
  const contenedor = document.getElementById("carruselContenido");
  if (!contenedor) return;

  const item = document.createElement("div");
  item.classList.add("carousel-item");

  // Si es el primero, marcar como activo
  if (contenedor.children.length === 0) item.classList.add("active");

  item.innerHTML = `
    <div class="noticia-portada">
      <img src="${data.noticia.imagen}" alt="Imagen noticia" />
      <h5>${data.noticia.titulo}</h5>
      <p class="copete">${data.noticia.copete}</p>
      <p class="desarrollo">${data.noticia.desarrollo}</p>
      <p class="info-usuario">Editado por: ${data.usuario}, edad ${data.edad} - ${data.fecha}</p>
    </div>
  `;

  contenedor.appendChild(item);
}

// Cargar todos los diarios guardados al iniciar galería
function cargarDiariosGuardados() {
  const diarios = JSON.parse(localStorage.getItem("diarios")) || [];
  diarios.forEach(agregarDiarioAlCarrusel);
}

// Si estás en galeria.html, cargar los diarios automáticamente
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("carruselContenido")) {
    cargarDiariosGuardados();
  }
});