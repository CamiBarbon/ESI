  window.addEventListener('DOMContentLoaded', () => {
    const burbuja = document.getElementById('burbuja-regional');
    const botonCerrar = document.querySelector('.cerrar-burbuja');

    if (!burbuja) return;

    setTimeout(() => {
      burbuja.classList.add('visible');

      // Auto ocultar a los 15s
      setTimeout(() => {
        burbuja.classList.remove('visible');
      }, 100000);
    }, 5000);

    if (botonCerrar) {
      botonCerrar.addEventListener('click', () => {
        burbuja.classList.remove('visible');
      });
    }
  });