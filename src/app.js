(function () {
  'use strict';

  var catalogoView = document.getElementById('catalogo-view');
  var catalogoLista = document.getElementById('catalogo-lista');
  var catalogoEstado = document.getElementById('catalogo-estado');
  var detalleView = document.getElementById('detalle-view');
  var detalleContenido = document.getElementById('detalle-contenido');
  var volverCatalogo = document.getElementById('volver-catalogo');
  var abrirCarrito = document.getElementById('abrir-carrito');
  var carritoContador = document.getElementById('carrito-contador');
  var carritoView = document.getElementById('carrito-view');
  var carritoEstado = document.getElementById('carrito-estado');
  var carritoLista = document.getElementById('carrito-lista');
  var carritoTotal = document.getElementById('carrito-total');
  var volverCatalogoDesdeCarrito = document.getElementById(
    'volver-catalogo-desde-carrito'
  );
  var catalogo = window.NovaShopCatalogo;
  var carrito = {};

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

  function buscarProducto(id) {
    return obtenerProductosValidos().find(function (producto) {
      return producto.id === id;
    });
  }

  function mostrarEstado(tipo, mensaje) {
    catalogoEstado.className = 'status-message status-' + tipo;
    catalogoEstado.textContent = mensaje;
  }

  function mostrarEstadoCarrito(tipo, mensaje) {
    carritoEstado.className = 'status-message status-' + tipo;
    carritoEstado.textContent = mensaje;
  }

  function formatoPrecio(precio) {
    return 'S/ ' + precioEnSoles.format(precio);
  }

  function centimosDesdePrecio(precio) {
    return Math.round(precio * 100);
  }

  function formatoCentesimos(centimos) {
    return formatoPrecio(centimos / 100);
  }

  function etiquetaDisponibilidad(producto) {
    return producto.disponible
      ? '<span class="availability availability-available">Disponible</span>'
      : '<span class="availability availability-sold-out">Agotado</span>';
  }

  function botonAgregar(producto) {
    return producto.disponible
      ? '<button class="add-button" type="button" data-add-product-id="' +
          escaparHtml(producto.id) +
          '">Agregar al carrito</button>'
      : '<button class="add-button add-button-disabled" type="button" data-add-product-id="' +
          escaparHtml(producto.id) +
          '">Agotado</button>';
  }

  function plantillaTarjeta(producto) {
    return (
      '<article class="product-card">' +
      '<button class="product-card-main" type="button" data-product-id="' +
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
      '</button>' +
      '<div class="product-card-actions">' +
      botonAgregar(producto) +
      '</div>' +
      '</article>'
    );
  }

  function actualizarContador() {
    var cantidadTotal = Object.keys(carrito).reduce(function (total, id) {
      return total + carrito[id].cantidad;
    }, 0);
    carritoContador.textContent = cantidadTotal;
  }

  function renderCatalogo() {
    catalogoView.hidden = false;
    detalleView.hidden = true;
    carritoView.hidden = true;
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
    var producto;

    try {
      producto = buscarProducto(id);
    } catch (error) {
      producto = null;
    }

    catalogoView.hidden = true;
    detalleView.hidden = false;
    carritoView.hidden = true;

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
      '<div class="detail-action">' +
      botonAgregar(producto) +
      '</div>' +
      '</div>' +
      '</article>';
  }

  function obtenerLineaValida(linea) {
    var producto;

    try {
      producto = buscarProducto(linea.productoId);
    } catch (error) {
      producto = null;
    }

    if (!producto || !Number.isInteger(linea.precioUnitarioCentesimos)) {
      return null;
    }

    return producto;
  }

  function calcularTotal() {
    return Object.keys(carrito).reduce(function (total, id) {
      var linea = carrito[id];
      return obtenerLineaValida(linea)
        ? total + linea.precioUnitarioCentesimos * linea.cantidad
        : total;
    }, 0);
  }

  function renderLinea(linea) {
    var producto = obtenerLineaValida(linea);

    if (!producto) {
      return (
        '<article class="cart-line cart-line-warning" role="alert">' +
        '<div><strong>' +
        escaparHtml(linea.nombre) +
        '</strong><p>No está disponible en el catálogo y no se muestra subtotal.</p></div>' +
        '<button class="remove-button" type="button" data-cart-action="remove" data-product-id="' +
        escaparHtml(linea.productoId) +
        '">Eliminar</button>' +
        '</article>'
      );
    }

    var subtotal = linea.precioUnitarioCentesimos * linea.cantidad;
    return (
      '<article class="cart-line">' +
      '<img class="cart-line-image" src="' +
      escaparHtml(linea.imagen) +
      '" alt="' +
      escaparHtml(linea.nombre) +
      '" />' +
      '<div class="cart-line-info"><h2>' +
      escaparHtml(linea.nombre) +
      '</h2><p>Precio unitario: ' +
      formatoCentesimos(linea.precioUnitarioCentesimos) +
      '</p><p>Subtotal: <strong>' +
      formatoCentesimos(subtotal) +
      '</strong></p></div>' +
      '<div class="cart-line-controls" aria-label="Cantidad de ' +
      escaparHtml(linea.nombre) +
      '">' +
      '<button type="button" data-cart-action="decrease" data-product-id="' +
      escaparHtml(linea.productoId) +
      '" aria-label="Disminuir cantidad">−</button>' +
      '<span aria-live="polite">' +
      linea.cantidad +
      '</span>' +
      '<button type="button" data-cart-action="increase" data-product-id="' +
      escaparHtml(linea.productoId) +
      '" aria-label="Aumentar cantidad">+</button>' +
      '</div>' +
      '<button class="remove-button" type="button" data-cart-action="remove" data-product-id="' +
      escaparHtml(linea.productoId) +
      '">Eliminar</button>' +
      '</article>'
    );
  }

  function renderCarrito() {
    catalogoView.hidden = true;
    detalleView.hidden = true;
    carritoView.hidden = false;
    actualizarContador();

    var ids = Object.keys(carrito);
    if (ids.length === 0) {
      mostrarEstadoCarrito('empty', 'Tu carrito está vacío.');
      carritoLista.innerHTML =
        '<p class="cart-empty">Agrega productos disponibles para comenzar.</p>';
    } else {
      mostrarEstadoCarrito('', '');
      carritoLista.innerHTML = ids.map(function (id) {
        return renderLinea(carrito[id]);
      }).join('');
    }

    carritoTotal.textContent = formatoCentesimos(calcularTotal());
  }

  function agregarAlCarrito(id) {
    var producto;

    try {
      producto = buscarProducto(id);
    } catch (error) {
      producto = null;
    }

    if (!producto) {
      mostrarEstado('error', 'No se pudo agregar el producto al carrito.');
      return;
    }

    if (!producto.disponible) {
      mostrarEstado('error', 'Este producto está agotado y no se puede agregar.');
      return;
    }

    if (carrito[id]) {
      carrito[id].cantidad += 1;
    } else {
      carrito[id] = {
        productoId: producto.id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precioUnitarioCentesimos: centimosDesdePrecio(producto.precio),
        cantidad: 1,
      };
    }

    actualizarContador();
    mostrarEstado('', 'Producto agregado al carrito.');
  }

  function actualizarLinea(id, accion) {
    var linea = carrito[id];
    if (!linea) {
      return;
    }

    if (accion === 'increase') {
      linea.cantidad += 1;
    } else if (accion === 'decrease') {
      linea.cantidad -= 1;
      if (linea.cantidad <= 0) {
        delete carrito[id];
      }
    } else if (accion === 'remove') {
      delete carrito[id];
    }

    renderCarrito();
  }

  catalogoLista.addEventListener('click', function (event) {
    var agregar = event.target.closest('[data-add-product-id]');
    if (agregar) {
      event.stopPropagation();
      agregarAlCarrito(agregar.getAttribute('data-add-product-id'));
      return;
    }

    var tarjeta = event.target.closest('[data-product-id]');
    if (tarjeta) {
      renderDetalle(tarjeta.getAttribute('data-product-id'));
    }
  });

  detalleContenido.addEventListener('click', function (event) {
    var agregar = event.target.closest('[data-add-product-id]');
    if (agregar) {
      agregarAlCarrito(agregar.getAttribute('data-add-product-id'));
    }
  });

  carritoLista.addEventListener('click', function (event) {
    var control = event.target.closest('[data-cart-action]');
    if (control) {
      actualizarLinea(
        control.getAttribute('data-product-id'),
        control.getAttribute('data-cart-action')
      );
    }
  });

  abrirCarrito.addEventListener('click', renderCarrito);
  volverCatalogo.addEventListener('click', renderCatalogo);
  volverCatalogoDesdeCarrito.addEventListener('click', renderCatalogo);

  renderCatalogo();
})();
