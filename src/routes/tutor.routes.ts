import { Router } from 'express';
import tutorController from '../controllers/tutor.controller';
import { checkExistsTutorEmail } from '../middlewares/checkExistsTutorEmail';

const router = Router();

router.get('/', tutorController.getAllTutors);

router.get('/:id', tutorController.getTutorByPk);

router.post('/', checkExistsTutorEmail, tutorController.createTutor);

export default router;
