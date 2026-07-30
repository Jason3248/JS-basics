import * as studentProfileController from "../controllers/studentProfileController.js";
import { Router } from "express";


const router = Router();

router.route("/").get(studentProfileController.getAllProfiles).post(studentProfileController.addProfile);



export default router;