import { Router } from 'express';
import petRoutes from './pet.routes';
const router = Router();
router.use('/v1/pets', petRoutes);
export default router;
