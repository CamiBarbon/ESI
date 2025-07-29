function descargarArchivo(nombreArchivo) {
    const link = document.createElement('a');
    link.href = `./descargas/${nombreArchivo}`;  // ajustá la ruta si está en otra carpeta
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }