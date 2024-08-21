import { Router } from 'express';
import petController from '../controllers/pet.controller';

const router = Router();

router.get('/', petController.getAllPets);

router.post('/', petController.createPet);

export default router;
