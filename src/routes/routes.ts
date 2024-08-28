import { Router } from 'express';
import petRoutes from './pet.routes';
import tutorRoutes from './tutor.routes';
import adestradorRoutes from './adestrador.routes';
import passeadorRoutes from './passeador.routes';

const router = Router();

router.use('/v1/tutor', tutorRoutes);
router.use('/v1/pet', petRoutes);
router.use('/v1/adestrador', adestradorRoutes);
router.use('/v1/passeador', passeadorRoutes);

export default router;
