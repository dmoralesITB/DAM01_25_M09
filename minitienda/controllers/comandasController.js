const { crearComanda, listarComandas, obtenerComanda } = require("../services/comandasService");

function postComanda(req, res, next) {
  try {
    const comanda = crearComanda(req.body);
    res.status(201).json(comanda);
  } catch (err) {
    next(err);
  }
}

function getComandas(req, res, next) {
  try {
    res.json(listarComandas());
  } catch (err) {
    next(err);
  }
}

function getComandaById(req, res, next) {
  try {
    const comanda = obtenerComanda(req.params.id);
    if (!comanda) return res.status(404).json({ error: "Comanda no encontrada" });
    res.json(comanda);
  } catch (err) {
    next(err);
  }
}

module.exports = { postComanda, getComandas, getComandaById };
