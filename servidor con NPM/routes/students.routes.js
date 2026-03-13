import { Router } from 'express';
import * as studentsController from '../controllers/students.controller.js';

const router = Router();

router.get("/", studentsController.getAll);
router.get("/:id", studentsController.getById);
router.get("/:id/notas", studentsController.getNotes);
router.post("/", studentsController.create);
router.put("/:id", studentsController.update);
router.delete("/:id", studentsController.remove);

export default router;
