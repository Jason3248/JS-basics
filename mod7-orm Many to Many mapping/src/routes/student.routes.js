import { Router } from "express";
import * as studentController from '../controllers/student.controller.js';


const router = Router();

router.route("/").get(studentController.getAllStudents)
                 .post(studentController.createStudent);


router.route("/:id").get(studentController.getStudentById)
                    .put(studentController.updateStudent)
                    .delete(studentController.deleteStudent)
                    .put(studentController.updateStudentDepartment);


router.route("/:id/profile").post(studentController.createStudentProfile)
                            .put(studentController.updateStudentProfile)
                            .delete(studentController.deleteStudentProfile);

export default router;