import express from 'express';
import { signin, signup } from '../controllers/auth.js';
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);

// google auth
router.post('/gsignin', )
export default router;