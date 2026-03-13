import { students } from '../data/students.js';

// Valida campos mínimos
function validateStudent(obj) {
 if (!obj || typeof obj !== "object") return "Body inválido";
 if (!obj.id || !obj.nombre || !obj.curso) return "Faltan campos: id, nombre, curso";
 return null;
}
// Comprueba si el id ya existe
const existsId = (id) => students.some(s => s.id === id);
export function getAll() {
 return students;
}
export function getById(id) {
 return students.find(s => s.id === id);
}
export function create(alumnoNew) {
 const validationMsg = validateStudent(alumnoNew);
 if (validationMsg) return { error: validationMsg };

 if (existsId(alumnoNew.id)) return { error: "id ya existe", status: 409 };

 students.push({ id: alumnoNew.id, nombre: alumnoNew.nombre, curso: alumnoNew.curso });
 return { data: alumnoNew };
}


export function update(id, payload) {
 const idx = students.findIndex(s => s.id === id);
 if (idx === -1) return null;

 if (payload && typeof payload === "object") {
   if (payload.nombre !== undefined) students[idx].nombre = payload.nombre;
   if (payload.curso !== undefined) students[idx].curso = payload.curso;
 }

 return students[idx];
}

export function remove(id) {
 const before = students.length;
 const filtered = students.filter(s => s.id !== id);

 if (filtered.length === before) return false;

 students.length = 0;
 students.push(...filtered);
 return true;
}



