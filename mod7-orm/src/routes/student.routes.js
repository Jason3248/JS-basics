import { Router } from "express";
import * as studentController from '../controllers/student.controller.js';



const router = Router();

router.route("/").get(studentController.getAllStudents)
                 .post(studentController.createStudent);

router.route("/:id").get(studentController.getStudentById)
                    .put(studentController.updateStudent)
                    .delete(studentController.deleteStudent);

export default router;