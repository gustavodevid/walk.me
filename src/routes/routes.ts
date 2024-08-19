import { Router } from 'express';
import petRoutes from './pet.routes';
import tutorRoutes from './tutor.routes';

const router = Router();

router.use('/v1/tutors', tutorRoutes);
router.use('/v1/pets', petRoutes);

export default router;
