import { Router } from "express";
import * as departmentController from "../controllers/department.controller.js";

const router = Router();

router.route("/").get(departmentController.getAllDepartments)
                 .post(departmentController.createDepartment);

router.route("/:id").get(departmentController.getDepartmentById)   
                    .put(departmentController.updateDepartment)
                    .delete(departmentController.deleteDepartment);

export default router;