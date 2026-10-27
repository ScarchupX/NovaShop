(function () {
  function crearImagen(color, etiqueta) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">' +
      '<rect width="640" height="480" rx="32" fill="' +
      color +
      '"/>' +
      '<circle cx="520" cy="100" r="82" fill="rgba(255,255,255,.18)"/>' +
      '<circle cx="120" cy="390" r="110" fill="rgba(255,255,255,.12)"/>' +
      '<text x="320" y="275" text-anchor="middle" font-size="150">' +
      etiqueta +
      '</text>' +
      '</svg>';

    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  window.NovaShopCatalogo = [
    {
      id: 'mochila-urbana',
      nombre: 'Mochila urbana',
      imagen: crearImagen('#dceeff', '🎒'),
      descripcion: 'Mochila cómoda para acompañarte todos los días.',
      precio: 89.9,
      disponible: true,
    },
    {
      id: 'polera-algodon',
      nombre: 'Polera de algodón',
      imagen: crearImagen('#fce4d8', '👕'),
      descripcion: 'Polera suave y versátil para tus momentos de descanso.',
      precio: 59.9,
      disponible: true,
    },
    {
      id: 'zapatillas-casuales',
      nombre: 'Zapatillas casuales',
      imagen: crearImagen('#e9defa', '👟'),
      descripcion: 'Diseño ligero para completar tus looks cotidianos.',
      precio: 129.9,
      disponible: false,
    },
  ];
})();
