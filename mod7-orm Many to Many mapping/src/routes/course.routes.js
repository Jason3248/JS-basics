import * as courseCountroller from '../controllers/course.controller.js';
import { Router } from 'express';


const router = Router();

router.route("/").get(courseCountroller.getAllCourses)
                  .post(courseCountroller.createCourse)


router.route("/:id").get(courseCountroller.getCourseById)
                     .put(courseCountroller.updateCourse)
                     .delete(courseCountroller.deleteCourse);

router.route("/:id/toggle").patch(courseCountroller.toggleCourseStatus);
export default router;