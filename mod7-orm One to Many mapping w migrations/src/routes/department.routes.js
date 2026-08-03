// import { Router } from "express";
// import * as departmentController from "../controllers/department.controller.js";

const express = require("express");
const router = express.Router();
const departmentController = require('../controllers/department.controller.js');

router.route("/").get(departmentController.getAllDepartments)
                 .post(departmentController.createDepartment);

router.route("/:id").get(departmentController.getDepartmentById)   
                    .put(departmentController.updateDepartment)
                    .delete(departmentController.deleteDepartment);

module.exports = router;