import express from 'express';
import * as studentController from '../controllers/studentController.js';
import { notFoundHandler } from '../middlewares/notFoundHandler.js';
const router = express.Router()



router.route("/").get(studentController.getAllStudents)
                 .post(studentController.addStudent);

        
router.route("/:studentId").get(studentController.getStudentById)
                            .put(studentController.updateStudent)
                            .delete(studentController.deleteStudentById);
            
export default router;
