import { Router } from 'express';
import passeadorController from '../controllers/passeador.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';
import { checkExistsToken } from '../middlewares/checkExistsToken';
import adestradorController from '../controllers/adestrador.controller';
import tutorController from '../controllers/tutor.controller';

const router = Router();

router.post('/passeador', passeadorController.loginPasseador);
router.post('/adestrador', adestradorController.loginAdestrador);
router.post('/tutor', tutorController.loginTutor);

export default router;
