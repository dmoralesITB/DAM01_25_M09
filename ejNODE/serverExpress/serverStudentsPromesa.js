const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3001;

/**
 * MIDDLEWARES
 * express.json() sustituye a toda la lógica de readBody con Promesas.
 */
app.use(express.json());

// Datos simulados
let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// --- FUNCIONES HELPER (Lógica extraída de tu versión) ---

function validateStudent(obj) {
  if (!obj || typeof obj !== "object") return "Body inválido";
  if (!obj.id || !obj.nombre || !obj.curso) return "Faltan campos: id, nombre, curso";
  return null;
}

function existsId(id) {
  return students.some(s => s.id === id);
}

// --- ENDPOINTS ---

// GET /students
app.get('/students', (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id
app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json(student);
});

// DELETE /students/:id
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const before = students.length;

  students = students.filter(s => s.id !== id);

  if (students.length === before) {
    return res.status(404).json({ message: "Not Found" });
  }

  // 204 No Content
  res.status(204).send();
});

// POST /students
app.post('/students', (req, res) => {
  const alumnoNew = req.body;

  // Validación de campos
  const validationMsg = validateStudent(alumnoNew);
  if (validationMsg) {
    return res.status(400).json({ message: validationMsg });
  }

  // Comprobar id único
  if (existsId(alumnoNew.id)) {
    return res.status(409).json({ message: "id ya existe" });
  }

  // Añadir al array
  const studentToSave = {
    id: alumnoNew.id,
    nombre: alumnoNew.nombre,
    curso: alumnoNew.curso
  };
  students.push(studentToSave);

  res.status(201).json({ message: "Created", student: studentToSave });
});

// PUT /students/:id
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const idx = students.findIndex(s => s.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  // Actualización parcial (Lógica idéntica a tu versión)
  if (payload && typeof payload === "object") {
    if (payload.nombre !== undefined) students[idx].nombre = payload.nombre;
    if (payload.curso !== undefined) students[idx].curso = payload.curso;
  }

  res.status(200).json(students[idx]);
});

// Ruta por defecto (404)
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Servidor
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});