import * as studentsService from '../services/students.service.js';
import * as notasService from '../services/notas.service.js';
export function getAll(req, res) {
 res.json(studentsService.getAll());
}
export function getById(req, res) {
 const student = studentsService.getById(req.params.id);

 if (!student) return res.status(404).json({ message: "Not Found" });
 res.json(student);
}

export function create(req, res) {
 const result = studentsService.create(req.body);

 if (result.error) {
   const status = result.status || 400;
   return res.status(status).json({ message: result.error });
 }

 res.status(201).json({ message: "Created", student: result.data });
}




export function update(req, res) {
 const updated = studentsService.update(req.params.id, req.body);

 if (!updated) return res.status(404).json({ message: "Not Found" });
 res.json(updated);
}

export function remove(req, res) {
 const deleted = studentsService.remove(req.params.id);

 if (!deleted) return res.status(404).json({ message: "Not Found" });
 res.sendStatus(204);
}

// Related data
export function getNotes(req, res) {
 const studentId = req.params.id;
 const student = studentsService.getById(studentId);
 if (!student) return res.status(404).json({ message: "Student not found" });
 const notes = notasService.getByStudentId(studentId);
 res.json(notes);
}

