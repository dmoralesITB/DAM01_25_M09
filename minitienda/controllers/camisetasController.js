const { listarCamisetas, obtenerCamiseta } = require("../services/camisetasService");

function getCamisetas(req, res, next) {
  try {
    const { talla, color, tag, q, sort } = req.query;
    const resultado = listarCamisetas({ talla, color, tag, q, sort });
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

function getCamisetaById(req, res, next) {
  try {
    const camiseta = obtenerCamiseta(req.params.id);
    if (!camiseta) return res.status(404).json({ error: "Camiseta no encontrada" });
    res.json(camiseta);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCamisetas, getCamisetaById };
