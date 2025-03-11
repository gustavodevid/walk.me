import { Router } from 'express';
import passeadorController from '../controllers/passeador.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/passeadors/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', passeadorController.getAllPasseadors);

router.get('/:id', passeadorController.getPasseadorByPk);

router.post('/', checkExistsUserEmail, passeadorController.createPasseador);

router.put('/:id', upload.single('foto'), passeadorController.updatePasseadorByPk);

router.delete('/:id', passeadorController.removePasseadorByPk);

export default router;
