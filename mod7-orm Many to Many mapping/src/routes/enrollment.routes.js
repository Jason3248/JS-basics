import * as enrollmentController from '../controllers/enrollment.controller.js';

import { Router } from 'express';
const router = Router();

router.route("/").post(enrollmentController.enrollStudent)
                 .get(enrollmentController.getEnrollments)
                 .patch(enrollmentController.updateGrade);
export default router;