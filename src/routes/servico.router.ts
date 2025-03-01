import { Router } from 'express';
import servicoController from '../controllers/servico.controller';

const router = Router();

router.get('/', servicoController.getAllServicos);

router.get('/:id', servicoController.getServicoByPk);

router.get('/tutor/:tutorId', servicoController.getServicosByTutorId);

router.post('/', servicoController.createServico);

router.delete('/:id', servicoController.removeServicoByPk);

export default router;