const express = require("express");
const router = express.Router();
const { postComanda, getComandas, getComandaById } = require("../controllers/comandasController");

router.post("/", postComanda);
router.get("/", getComandas);
router.get("/:id", getComandaById);

module.exports = router;
