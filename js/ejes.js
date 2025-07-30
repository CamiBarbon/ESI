document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.eje').forEach(eje => {
    eje.addEventListener('click', () => {
      const span = eje.querySelector('.texto-eje');
      const titulo = eje.dataset.titulo;
      const contenido = eje.dataset.contenido;

      // Mostrar contenido y marcar como activo
      eje.classList.add('activo');
      span.textContent = contenido;

      // Limpiar cualquier timeout anterior si el usuario hace clic varias veces
      if (eje.timeoutId) {
        clearTimeout(eje.timeoutId);
      }

      // Volver al título original después de 10 segundos
      eje.timeoutId = setTimeout(() => {
        span.textContent = titulo;
        eje.classList.remove('activo');
      }, 10000);
    });
  });
});