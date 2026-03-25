const express = require("express");
const router = express.Router();
const { getCamisetas, getCamisetaById } = require("../controllers/camisetasController");

router.get("/", getCamisetas);
router.get("/:id", getCamisetaById);

module.exports = router;
