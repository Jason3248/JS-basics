import express from 'express';
import { getAllStudents, 
         getStudentById, 
         getStudentsByEnrollment 
        } from '../controllers/studentController.js';


const router = express.Router();

router.get("/", getAllStudents);
router.get("/:studentId", getStudentById);

export default router;