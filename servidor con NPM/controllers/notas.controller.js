import * as notasService from '../services/notas.service.js';

export function getAll(req, res) {
  const filter = {};
  if (req.query.studentId) filter.studentId = req.query.studentId;
  res.json(notasService.getAll(filter));
}

export function getById(req, res) {
  const nota = notasService.getById(parseInt(req.params.id));
  if (!nota) return res.status(404).json({ message: 'Not Encontrado' });
  res.json(nota);
}

export function create(req, res) {
  const result = notasService.create(req.body);
  if (result.error) {
    const status = result.status || 400;
    return res.status(status).json({ message: result.error });
  }
  res.status(201).json({ message: 'Creado', nota: result.data });
}

export function update(req, res) {
  const updated = notasService.update(parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'No Encontrado o Id Invalido' });
  res.json(updated);
}

export function remove(req, res) {
  const deleted = notasService.remove(parseInt(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Not Encontrado' });
  res.sendStatus(204);
}
