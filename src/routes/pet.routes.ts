import { Router } from 'express';

const router = Router();

router.get('/', () => {
    console.log("pets");   
});

export default router;
