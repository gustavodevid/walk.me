import { Router } from 'express';
import tutorController from '../controllers/tutor.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tutors/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', tutorController.getAllTutors);

router.get('/:id', tutorController.getTutorByPk);

router.post('/', checkExistsUserEmail, upload.single('foto'), tutorController.createTutor);

router.put('/:id', upload.single('foto'), tutorController.updateTutorByPk);

router.delete('/:id', tutorController.removeTutorByPk);

export default router;
