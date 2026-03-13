import { notas, nextId } from '../data/notas.js';
import * as studentsService from './students.service.js';

function validateNota(obj) {
  if (!obj || typeof obj !== 'object') return 'Body inválido';
  if (!obj.studentId || !obj.modulo || obj.nota === undefined) return 'Faltan campos: studentId, modulo, nota';
  const student = studentsService.getById(obj.studentId);
  if (!student) return 'El Estudante no existe';
  return null;
}

const existsId = (id) => notas.some(n => n.id === id);

export function getAll(filter = {}) {
  if (filter.studentId) {
    return notas.filter(n => n.studentId === filter.studentId);
  }
  return notas;
}

export function getById(id) {
  return notas.find(n => n.id === id);
}

export function getByStudentId(studentId) {
  return notas.filter(n => n.studentId === studentId);
}

export function create(notaNew) {
  const validation = validateNota(notaNew);
  if (validation) return { error: validation };
  const newNota = {
    id: nextId++,
    studentId: notaNew.studentId,
    modulo: notaNew.modulo,
    nota: notaNew.nota,
  };
  notas.push(newNota);
  return { data: newNota };
}

export function update(id, payload) {
  const idx = notas.findIndex(n => n.id === id);
  if (idx === -1) return null;

  if (payload && typeof payload === 'object') {
    if (payload.modulo !== undefined) notas[idx].modulo = payload.modulo;
    if (payload.nota !== undefined) notas[idx].nota = payload.nota;
    if (payload.studentId !== undefined) {
      const student = studentsService.getById(payload.studentId);
      if (!student) return null; 
      notas[idx].studentId = payload.studentId;
    }
  }
  return notas[idx];
}

export function remove(id) {
  const before = notas.length;
  const filtered = notas.filter(n => n.id !== id);
  if (filtered.length === before) return false;
  notas.length = 0;
  notas.push(...filtered);
  return true;
}
