import express from 'express';
import { getAllStudents, 
         getStudentsById,
         addStudent
        } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:studentId', getStudentsById);
router.post('/', addStudent);

export default router;