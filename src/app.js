(function () {
  'use strict';

  var catalogoView = document.getElementById('catalogo-view');
  var catalogoLista = document.getElementById('catalogo-lista');
  var catalogoEstado = document.getElementById('catalogo-estado');
  var detalleView = document.getElementById('detalle-view');
  var detalleContenido = document.getElementById('detalle-contenido');
  var volverCatalogo = document.getElementById('volver-catalogo');
  var catalogo = window.NovaShopCatalogo;

  var precioEnSoles = new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function escaparHtml(valor) {
    return String(valor)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function esProductoValido(producto) {
    return (
      producto &&
      typeof producto.id === 'string' &&
      producto.id.trim() !== '' &&
      typeof producto.nombre === 'string' &&
      producto.nombre.trim() !== '' &&
      typeof producto.imagen === 'string' &&
      producto.imagen.trim() !== '' &&
      typeof producto.descripcion === 'string' &&
      producto.descripcion.trim() !== '' &&
      typeof producto.precio === 'number' &&
      Number.isFinite(producto.precio) &&
      producto.precio >= 0 &&
      typeof producto.disponible === 'boolean'
    );
  }

  function obtenerProductosValidos() {
    if (!Array.isArray(catalogo)) {
      throw new Error('El catálogo no está disponible.');
    }

    var ids = {};
    var productos = catalogo.filter(function (producto) {
      if (!esProductoValido(producto) || ids[producto.id]) {
        return false;
      }
      ids[producto.id] = true;
      return true;
    });

    if (catalogo.length > 0 && productos.length === 0) {
      throw new Error('El catálogo no contiene productos válidos.');
    }

    return productos;
  }

  function mostrarEstado(tipo, mensaje) {
    catalogoEstado.className = 'status-message status-' + tipo;
    catalogoEstado.textContent = mensaje;
  }

  function formatoPrecio(precio) {
    return 'S/ ' + precioEnSoles.format(precio);
  }

  function etiquetaDisponibilidad(producto) {
    return producto.disponible
      ? '<span class="availability availability-available">Disponible</span>'
      : '<span class="availability availability-sold-out">Agotado</span>';
  }

  function plantillaTarjeta(producto) {
    return (
      '<button class="product-card" type="button" data-product-id="' +
      escaparHtml(producto.id) +
      '" aria-label="Ver detalle de ' +
      escaparHtml(producto.nombre) +
      '">' +
      '<span class="product-image-wrap"><img class="product-image" src="' +
      escaparHtml(producto.imagen) +
      '" alt="' +
      escaparHtml(producto.nombre) +
      '" /></span>' +
      '<span class="product-card-body">' +
      '<span class="product-card-topline">' +
      etiquetaDisponibilidad(producto) +
      '</span>' +
      '<span class="product-name">' +
      escaparHtml(producto.nombre) +
      '</span>' +
      '<span class="product-description">' +
      escaparHtml(producto.descripcion) +
      '</span>' +
      '<span class="product-price">' +
      formatoPrecio(producto.precio) +
      '</span>' +
      '</span>' +
      '</button>'
    );
  }

  function renderCatalogo() {
    catalogoView.hidden = false;
    detalleView.hidden = true;
    catalogoLista.innerHTML = '';

    try {
      var productos = obtenerProductosValidos();

      if (productos.length === 0) {
        mostrarEstado('empty', 'No hay productos disponibles para consultar.');
        return;
      }

      mostrarEstado('', '');
      catalogoLista.innerHTML = productos.map(plantillaTarjeta).join('');
    } catch (error) {
      mostrarEstado(
        'error',
        'No se pudo cargar el catálogo. Intenta consultar nuevamente más tarde.'
      );
    }
  }

  function renderDetalle(id) {
    var productos;

    try {
      productos = obtenerProductosValidos();
    } catch (error) {
      productos = [];
    }

    var producto = productos.find(function (item) {
      return item.id === id;
    });

    catalogoView.hidden = true;
    detalleView.hidden = false;

    if (!producto) {
      detalleContenido.innerHTML =
        '<div class="detail-message status-error" role="alert">' +
        '<h1 id="detalle-titulo">Producto no disponible</h1>' +
        '<p>No encontramos este producto en el catálogo.</p>' +
        '</div>';
      return;
    }

    detalleContenido.innerHTML =
      '<article class="product-detail">' +
      '<div class="detail-image-wrap"><img class="detail-image" src="' +
      escaparHtml(producto.imagen) +
      '" alt="' +
      escaparHtml(producto.nombre) +
      '" /></div>' +
      '<div class="detail-copy">' +
      '<p class="eyebrow">Detalle del producto</p>' +
      '<h1 id="detalle-titulo">' +
      escaparHtml(producto.nombre) +
      '</h1>' +
      '<p class="detail-description">' +
      escaparHtml(producto.descripcion) +
      '</p>' +
      '<p class="detail-price">' +
      formatoPrecio(producto.precio) +
      '</p>' +
      '<div class="detail-availability">' +
      etiquetaDisponibilidad(producto) +
      '</div>' +
      '</div>' +
      '</article>';
  }

  catalogoLista.addEventListener('click', function (event) {
    var tarjeta = event.target.closest('[data-product-id]');
    if (tarjeta) {
      renderDetalle(tarjeta.getAttribute('data-product-id'));
    }
  });

  volverCatalogo.addEventListener('click', renderCatalogo);

  renderCatalogo();
})();
