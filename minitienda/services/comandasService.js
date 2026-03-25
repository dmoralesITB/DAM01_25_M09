const { obtenerCamiseta } = require("./camisetasService");

const comandas = [];
let contador = 1;

// ── Validación ─────────────────────────────────────────────────────────────────

function validarComanda({ cliente, direccion, items }) {
  const errores = [];

  // cliente
  if (!cliente?.nombre || cliente.nombre.trim().length < 2)
    errores.push("cliente.nombre es obligatorio y debe tener al menos 2 caracteres");
  if (!cliente?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email))
    errores.push("cliente.email es obligatorio y debe tener formato válido");

  // items
  if (!Array.isArray(items) || items.length === 0)
    errores.push("items debe ser un array con al menos 1 elemento");

  if (Array.isArray(items)) {
    items.forEach((item, i) => {
      const label = `items[${i}]`;
      const camiseta = obtenerCamiseta(item.camisetaId);

      if (!camiseta)
        errores.push(`${label}.camisetaId "${item.camisetaId}" no existe en el catálogo`);
      else {
        if (!camiseta.tallas.includes(item.talla))
          errores.push(`${label}.talla "${item.talla}" no disponible para ${camiseta.nombre} (disponibles: ${camiseta.tallas.join(", ")})`);
        if (!camiseta.colores.includes(item.color))
          errores.push(`${label}.color "${item.color}" no disponible para ${camiseta.nombre} (disponibles: ${camiseta.colores.join(", ")})`);
      }

      if (!Number.isInteger(item.cantidad) || item.cantidad < 1)
        errores.push(`${label}.cantidad debe ser un entero ≥ 1`);
    });
  }

  return errores;
}

// ── Creación ───────────────────────────────────────────────────────────────────

function crearComanda({ cliente, direccion, items }) {
  const errores = validarComanda({ cliente, direccion, items });
  if (errores.length > 0) {
    const err = new Error("Datos de la comanda inválidos");
    err.status = 400;
    err.errores = errores;
    throw err;
  }

  const lineas = items.map(item => {
    const camiseta = obtenerCamiseta(item.camisetaId);
    const subtotal = parseFloat((camiseta.precioBase * item.cantidad).toFixed(2));
    return {
      camisetaId: item.camisetaId,
      nombre: camiseta.nombre,
      talla: item.talla,
      color: item.color,
      cantidad: item.cantidad,
      precioUnitario: camiseta.precioBase,
      subtotal,
    };
  });

  const total = parseFloat(lineas.reduce((acc, l) => acc + l.subtotal, 0).toFixed(2));
  const id = `ORD-${String(contador++).padStart(4, "0")}`;

  const comanda = {
    id,
    fecha: new Date().toISOString(),
    estado: "recibida",
    cliente,
    direccion: direccion || {},
    items: lineas,
    total,
  };

  comandas.push(comanda);
  return comanda;
}

function listarComandas() {
  return comandas;
}

function obtenerComanda(id) {
  return comandas.find(c => c.id === id) || null;
}

module.exports = { crearComanda, listarComandas, obtenerComanda };
