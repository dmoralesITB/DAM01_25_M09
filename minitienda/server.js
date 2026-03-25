const express = require("express");
const cors = require("cors");

const camisetasRouter = require("./routes/camisetas");
const comandasRouter = require("./routes/comandas");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/camisetas", camisetasRouter);
app.use("/api/comandas", comandasRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const response = { error: err.message };
  if (err.errores) response.errores = err.errores;
  res.status(status).json(response);
});

app.listen(PORT, () => {
  console.log(`TeeLab API corriendo en http://localhost:${PORT}`);
});

module.exports = app;