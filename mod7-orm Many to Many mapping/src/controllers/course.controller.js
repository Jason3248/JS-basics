import { Course  } from "../models/index.js";
import handleSequelizeError from "../middlewares/handleSequelizeError.js";
import parseIntId from "../utils.js/parseIntId.js";
import verifyUpdationData from "../utils.js/verifyUpdationData.js";

export const createCourse = async(req, res) => {
    try {
        const courseData = req.body;
        if(!courseData.name || !courseData.credits){
            return res.status(400).json({
                success: true,
                message: "Please provide the course name and credits assigned"
            })
        }
        const course = await Course.create(courseData);
        return res.status(201).json({
            success: true,
            message: `Course with id: ${course.id} created successfully`
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}

export const getAllCourses = async(req, res) => {
    try {
        const courses = await Course.findAll({
            where: {
                isActive: true
            }
        });
        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}

export const getCourseById = async(req, res) => {
    try {
        const courseId = parseIntId(req.params.id);
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "The course ID should be a positive integer"
            })
        }
        const course = await Course.findByPk(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        res.status(200).json({
            success: true,
            data: course
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}

export const updateCourse = async(req, res) => {
    try {
        const courseId = parseIntId(req.params.id);
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "The course ID should be a positive integer"
            })
        }
        const courseData = verifyUpdationData(req.body);
        if(!courseData){
            return res.status(400).json({
                success: false,
                message: "Updation operation requires at least one field"
            })
        }
        const course = await Course.findByPk(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        await course.update(courseData);
        res.status(200).json({
            success: true,
            message: `Course with id : ${courseId} updated successfully`
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}

export const deleteCourse = async(req, res) => {
    try {
        const courseId = parseIntId(req.params.id);
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "The course ID should be a positive integer"
            })
        }
        const course = await Course.findByPk(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        res.status(200).json({
            success: true,
            message: `Course with id: ${courseId} deleted successfully`
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
} 

export const toggleCourseStatus = async(req, res) => {
    try {
        const courseId = parseIntId(req.params.id);
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "The course ID should be a positive integer"
            })
        }
        const course = await Course.findByPk(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        course.isActive = !course.isActive;
        await course.save();
        return res.status(200).json({
            success: true,
            message: `The course with id: ${courseId} is now ${course.isActive ? 'Active' : 'Inactive'}`
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}