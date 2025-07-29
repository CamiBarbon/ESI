 // Para accesibilidad: cuando se hace click en el enlace, setear foco en el bloque destino
    document.querySelectorAll('.eje').forEach(link => {
      link.addEventListener('click', e => {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if(target){
          // Para que el foco no se pierda y el teclado lea el bloque
          setTimeout(() => {
            target.focus();
          }, 300);
        }
      });
    });