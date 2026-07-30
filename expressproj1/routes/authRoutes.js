import express from 'express';
import { adminRegister } from '../controllers/authController.js';
const router = express.Router();

router.put('/', adminRegister);

export default router;