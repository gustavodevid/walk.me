import { Router } from 'express';
import petController from '../controllers/pet.controller';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pets/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', petController.getAllPets);

router.get('/:id', petController.getPetByPk);

router.get('/tutor/:id', petController.getPetsByTutorId);

router.post('/',  upload.single('foto'), petController.createPet);

export default router;
