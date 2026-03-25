// ──────────────────────────────────────────────────────────────
// Datos: en Pr02 esto viene de /api/camisetas
// ──────────────────────────────────────────────────────────────
const productosJSON = `[
  {"id":"TSH01","nombre":"MACACARENA","descripcion":"Quan balles sense vergonya i el ritme et domina.","precioBase":19.95,"tallas":["S","M","L","XL"],"colores":["blanco","negro","mostaza"],"imagenes":{"blanco":"img/MACACARENA.png","negro":"img/MACACARENA_BLACK.png","mostaza":"img/MACACARENA.png"},"tags":["nuevo"]},
  {"id":"TSH02","nombre":"NINETIES MODE","descripcion":"Un homenatge pixelat als anys 90.","precioBase":21.50,"tallas":["S","M","L","XL","XXL"],"colores":["gris","negro"],"imagenes":{"gris":"img/NINETIES.png","negro":"img/NINETIES_BLACK.png"},"tags":["retro"]},
  {"id":"TSH03","nombre":"RESERVOIR INVADERS","descripcion":"Quan Tarantino coneix els videojocs clàssics.","precioBase":22.90,"tallas":["M","L","XL"],"colores":["azul","negro"],"imagenes":{"azul":"img/RESERVOIR.png","negro":"img/RESERVOIR_BLACK.png"},"tags":["edicion-especial"]},
  {"id":"TSH04","nombre":"VITRUVIAN CODE","descripcion":"Art, codi i proporció perfecta.","precioBase":24.00,"tallas":["S","M","L","XL"],"colores":["blanco","negro"],"imagenes":{"blanco":"img/VITRUVIAN.png","negro":"img/VITRUVIAN_BLACK.png"},"tags":["premium"]}
]`;

const productos = JSON.parse(productosJSON);

// Estado de selección por producto
const seleccion = {};

// Carrito: array de { id, nombre, talla, color, cantidad, precio, subtotal }
const carrito = [];

// Colores CSS para los círculos
const COLOR_MAP = {
  blanco:  "#f5f5f5",
  negro:   "#1a1a1a",
  mostaza: "#d4a017",
  gris:    "#9e9e9e",
  azul:    "#1e3a5f",
  rojo:    "#c0392b",
  verde:   "#27ae60",
};

// ──────────────────────────────────────────────────────────────
// Init
// ──────────────────────────────────────────────────────────────
function init() {
  generarCatalogo();
  document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
  document.getElementById("btn-confirmar").addEventListener("click", confirmarPedido);
}

// ──────────────────────────────────────────────────────────────
// Catálogo
// ──────────────────────────────────────────────────────────────
function generarCatalogo() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";
  productos.forEach(prod => {
    seleccion[prod.id] = {
      talla:    prod.tallas[0],
      color:    prod.colores[0],
      cantidad: 1,
    };
    const article = crearArticulo(prod);
    contenedor.appendChild(article);
  });
}

function crearArticulo(prod) {
  const article = document.createElement("article");
  article.className = "card";
  article.id = `card-${prod.id}`;

  article.appendChild(crearImagen(prod));
  article.appendChild(crearContenido(prod));

  return article;
}

function crearImagen(prod) {
  const img = document.createElement("img");
  img.className = "card-imagen";
  img.src = Object.values(prod.imagenes)[0];
  img.alt = prod.nombre;
  img.onerror = () => { img.style.background = "#ddd"; img.style.display = "block"; };
  return img;
}

function crearContenido(prod) {
  const div = document.createElement("div");
  div.className = "card-contenido";

  div.appendChild(crearTag(prod));
  div.appendChild(crearNombre(prod));
  div.appendChild(crearDescripcion(prod));
  div.appendChild(crearPrecio(prod));
  div.appendChild(crearSelectorTallas(prod));
  div.appendChild(crearSelectorColores(prod));
  div.appendChild(crearSelectorCantidad(prod));
  div.appendChild(crearBotonAgregar(prod));

  return div;
}

function crearTag(prod) {
  const span = document.createElement("span");
  span.className = `card-tag tag-${prod.tags[0]}`;
  span.textContent = prod.tags[0].toUpperCase().replace("-", " ");
  return span;
}

function crearNombre(prod) {
  const h3 = document.createElement("h3");
  h3.className = "card-nombre";
  h3.textContent = prod.nombre;
  return h3;
}

function crearDescripcion(prod) {
  const p = document.createElement("p");
  p.className = "card-descripcion";
  p.textContent = prod.descripcion;
  return p;
}

function crearPrecio(prod) {
  const p = document.createElement("p");
  p.className = "card-precio";
  p.id = `precio-${prod.id}`;
  p.textContent = `${prod.precioBase.toFixed(2)}€`;
  return p;
}

// ── Selector de tallas (botones) ────────────────────────────────
function crearSelectorTallas(prod) {
  const wrapper = document.createElement("div");

  const label = document.createElement("p");
  label.className = "tallas-label";
  label.textContent = "Talla:";
  wrapper.appendChild(label);

  const grupo = document.createElement("div");
  grupo.className = "tallas-grupo";

  prod.tallas.forEach(talla => {
    const btn = document.createElement("button");
    btn.className = "btn-talla" + (talla === seleccion[prod.id].talla ? " seleccionada" : "");
    btn.textContent = talla;
    btn.id = `talla-${prod.id}-${talla}`;
    btn.addEventListener("click", () => seleccionarTalla(prod.id, talla));
    grupo.appendChild(btn);
  });

  wrapper.appendChild(grupo);
  return wrapper;
}

function seleccionarTalla(prodId, talla) {
  seleccion[prodId].talla = talla;
  const prod = productos.find(p => p.id === prodId);
  prod.tallas.forEach(t => {
    const btn = document.getElementById(`talla-${prodId}-${t}`);
    btn.classList.toggle("seleccionada", t === talla);
  });
}

// ── Selector de colores (círculos) ──────────────────────────────
function crearSelectorColores(prod) {
  const wrapper = document.createElement("div");

  const label = document.createElement("p");
  label.className = "colores-label";
  label.textContent = "Color:";
  wrapper.appendChild(label);

  const grupo = document.createElement("div");
  grupo.className = "colores-grupo";

  prod.colores.forEach(color => {
    const btn = document.createElement("button");
    btn.className = "btn-color" + (color === seleccion[prod.id].color ? " seleccionado" : "");
    btn.style.background = COLOR_MAP[color] || "#ccc";
    btn.title = color;
    btn.id = `color-${prod.id}-${color}`;
    btn.addEventListener("click", () => seleccionarColor(prod, color));
    grupo.appendChild(btn);
  });

  wrapper.appendChild(grupo);
  return wrapper;
}

function seleccionarColor(prod, color) {
  seleccion[prod.id].color = color;
  const img = document.querySelector(`#card-${prod.id} .card-imagen`);
  if (img && prod.imagenes[color]) img.src = prod.imagenes[color];
  prod.colores.forEach(c => {
    const btn = document.getElementById(`color-${prod.id}-${c}`);
    btn.classList.toggle("seleccionado", c === color);
  });
}

// ── Selector de cantidad (+/-) ──────────────────────────────────
function crearSelectorCantidad(prod) {
  const wrapper = document.createElement("div");

  const label = document.createElement("p");
  label.className = "cantidad-label";
  label.textContent = "Cantidad:";
  wrapper.appendChild(label);

  const grupo = document.createElement("div");
  grupo.className = "cantidad-grupo";

  const btnMenos = document.createElement("button");
  btnMenos.className = "btn-cantidad";
  btnMenos.textContent = "−";
  btnMenos.addEventListener("click", () => cambiarCantidad(prod, -1));

  const span = document.createElement("span");
  span.className = "cantidad-valor";
  span.id = `cantidad-${prod.id}`;
  span.textContent = "1";

  const btnMas = document.createElement("button");
  btnMas.className = "btn-cantidad";
  btnMas.textContent = "+";
  btnMas.addEventListener("click", () => cambiarCantidad(prod, 1));

  grupo.appendChild(btnMenos);
  grupo.appendChild(span);
  grupo.appendChild(btnMas);
  wrapper.appendChild(grupo);

  return wrapper;
}

function cambiarCantidad(prod, delta) {
  const nueva = Math.max(1, seleccion[prod.id].cantidad + delta);
  seleccion[prod.id].cantidad = nueva;
  document.getElementById(`cantidad-${prod.id}`).textContent = nueva;
  const precioEl = document.getElementById(`precio-${prod.id}`);
  precioEl.textContent = `${(prod.precioBase * nueva).toFixed(2)}€`;
}

// ── Botón agregar al carrito ────────────────────────────────────
function crearBotonAgregar(prod) {
  const btn = document.createElement("button");
  btn.className = "btn-agregar";
  btn.textContent = "AÑADIR AL CARRITO";
  btn.addEventListener("click", () => agregarAlCarrito(prod));
  return btn;
}

// ──────────────────────────────────────────────────────────────
// Carrito
// ──────────────────────────────────────────────────────────────
function agregarAlCarrito(prod) {
  const { talla, color, cantidad } = seleccion[prod.id];
  const item = {
    id:       prod.id,
    nombre:   prod.nombre,
    talla,
    color,
    cantidad,
    precio:   prod.precioBase,
    subtotal: parseFloat((prod.precioBase * cantidad).toFixed(2)),
  };
  carrito.push(item);
  renderTicket();
  mostrarToast(`✓ ${prod.nombre} añadida al carrito`);
}

function vaciarCarrito() {
  carrito.length = 0;
  renderTicket();
}

function quitarLineaCarrito(index) {
  carrito.splice(index, 1);
  renderTicket();
}

function renderTicket() {
  const lista    = document.getElementById("ticket-lista");
  const vacio    = document.getElementById("ticket-vacio");
  const totalEl  = document.getElementById("ticket-total");
  const acciones = document.getElementById("ticket-acciones");

  lista.innerHTML = "";

  if (carrito.length === 0) {
    vacio.style.display = "block";
    totalEl.textContent = "";
    acciones.style.display = "none";
    return;
  }

  vacio.style.display = "none";
  acciones.style.display = "flex";

  carrito.forEach((item, i) => {
    lista.appendChild(crearLineaTicket(item, i));
  });

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
  totalEl.textContent = `Total: ${total.toFixed(2)}€`;
}

function crearLineaTicket(item, index) {
  const li = document.createElement("li");
  li.className = "ticket-linea";

  const info = document.createElement("div");
  info.className = "ticket-linea-info";
  info.innerHTML = `<strong>${item.nombre}</strong>
    <div class="ticket-linea-detalle">Talla: ${item.talla} · Color: ${item.color} · Cant: ${item.cantidad}</div>`;

  const precio = document.createElement("span");
  precio.className = "ticket-linea-precio";
  precio.textContent = `${item.subtotal.toFixed(2)}€`;

  const btnQuitar = document.createElement("button");
  btnQuitar.className = "btn-quitar";
  btnQuitar.textContent = "✕";
  btnQuitar.title = "Quitar";
  btnQuitar.addEventListener("click", () => quitarLineaCarrito(index));

  li.appendChild(info);
  li.appendChild(precio);
  li.appendChild(btnQuitar);
  return li;
}

function confirmarPedido() {
  if (carrito.length === 0) return;
  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
  mostrarToast(`🎉 Pedido confirmado · Total: ${total.toFixed(2)}€`);
  carrito.length = 0;
  renderTicket();
}

// ──────────────────────────────────────────────────────────────
// Toast
// ──────────────────────────────────────────────────────────────
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2500);
}