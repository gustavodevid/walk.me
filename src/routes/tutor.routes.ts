import { Router } from 'express';
import tutorController from '../controllers/tutor.controller';

const router = Router();

router.get('/', tutorController.getAllTutors);

router.get('/:id', tutorController.getTutorByPk);

router.post('/', tutorController.createTutor);

export default router;
