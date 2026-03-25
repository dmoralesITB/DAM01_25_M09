const camisetas = require("../data/camisetas");

const SORTS_VALIDOS = ["precio_asc", "precio_desc", "nombre_asc", "nombre_desc"];

function listarCamisetas({ talla, color, tag, q, sort } = {}) {
  if (sort && !SORTS_VALIDOS.includes(sort)) {
    const err = new Error(`Sort no reconocido: "${sort}". Valores válidos: ${SORTS_VALIDOS.join(", ")}`);
    err.status = 400;
    throw err;
  }

  let resultado = [...camisetas];

  if (talla)  resultado = resultado.filter(c => c.tallas.includes(talla));
  if (color)  resultado = resultado.filter(c => c.colores.includes(color));
  if (tag)    resultado = resultado.filter(c => c.tags.includes(tag));
  if (q) {
    const ql = q.toLowerCase();
    resultado = resultado.filter(
      c => c.nombre.toLowerCase().includes(ql) || c.descripcion.toLowerCase().includes(ql)
    );
  }

  if (sort === "precio_asc")   resultado.sort((a, b) => a.precioBase - b.precioBase);
  if (sort === "precio_desc")  resultado.sort((a, b) => b.precioBase - a.precioBase);
  if (sort === "nombre_asc")   resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  if (sort === "nombre_desc")  resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));

  return resultado;
}

function obtenerCamiseta(id) {
  return camisetas.find(c => c.id === id) || null;
}

module.exports = { listarCamisetas, obtenerCamiseta };
