import handleSequelizeError from "../middlewares/handleSequelizeError.js";
import Enrollment from "../models/enrollment.model.js";
import { Student, Course } from "../models/index.js";


export const enrollStudent = async(req, res) => {
    try {
        const {studentId, courseId} = req.body;
        const student = await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                message: `Student with id: ${studentId} not found`
            });  
        }
        const course = await Course.findByPk(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        if(!course.isActive){
            return res.status(400).json({
                success: false,
                message: `The course ${course.name} is currently unavailable`
            })
        }

        await student.addCourse(course);
        res.status(200).json({
            success: true,
            message: `Student(id:${studentId}) enrolled for the course(id:${courseId}) successfully`
        })
    } catch (error) {
        console.log("error while enrolling student for the course", error.message);
    }
}

export const getEnrollments = async(req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
        return res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        })
    } catch (error) {
        console.log("error while fetching enrollments : ", error.message);
    }
}


export const updateGrade = async(req, res) => {
    try {
        const {studentId, courseId, grade} = req.body;
        const enrollment = await Enrollment.findOne({
            where: {
                studentId,
                courseId
            }
        });
        if(!enrollment){
            return res.status(400).json({
                success: false,
                message: "Student enrollment data is unavailable"
            })
        }
        await enrollment.update({grade});
        return res.status(200).json({
            success: true,
            message: "The grade has been updated successfully"
        })

    } catch (error) {
        return handleSequelizeError(error, res);
    }
}