import {Router} from 'express';
import * as studentController from '../controllers/studentController.js';

const router = Router();

router.route('/').get(studentController.getAllStudents).post(studentController.addStudent);

router.route('/:studentId').get(studentController.getStudentById).put(studentController.updateStudent).delete(studentController.deleteStudent);


export default router;
