import { parse } from "dotenv";
import * as studentRepository from "../repositories/studentRepository.js"
import { validateStudentData, validateUpdateData, parseStudentId } from "../utils/studentValidation.js";

export const getAllStudents = async(req, res) => {
    try {
        console.log("Request received");
        
        const studentList = await studentRepository.findAll();
        console.log("StudentList", studentList);
        
        return res.status(200).json({
            success: true,
            count: studentList.length,
            data: studentList
        })
    } catch (error) {
    }
}


export const getStudentById = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.studentId);
        const student = await studentRepository.findById(studentId);
        if(!student){
            const error = new Error(`Student with id: ${studentId} not available`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success: true,
            data: student
        })
    } catch (error) {
        console.log("Error while fetching student by id : ", error.message);
    }
}


export const addStudent = async(req, res) => {
    try {
        console.log(req.body);
        validateStudentData(req.body);
        const existingStudent = await studentRepository.findByEmail(req.body.email);
        if(existingStudent){
            const error = new Error("Student email ID must be unique");
            error.statusCode = 409;
            throw error;
        }
        const createdStudent = await studentRepository.create(req.body);

        return res.status(200).json({
            success: true,
            data: createdStudent
        })
    } catch (error) {
        console.log("Error while creating student : ", error.message);
    }
}



export const updateStudent = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.studentId);
        validateUpdateData(req.body);
        if(req.body.email){
            const existingStudent = await studentRepository.findByEmail(req.body.email);
            if(existingStudent && existingStudent.id !== studentId){
                const error = new Error("The email is already taken!");
                error.statusCode = 400;
                throw error;
            }
        }
        const updatedStudent = await studentRepository.updateById(studentId, req.body);
        return res.status(200).json({
            success: true,
            data: updatedStudent
        })
    } catch (error) {
        console.log("Error while updating student data : ", error.message);
    }
}


export const deleteStudent = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.studentId);
        const deletedStudent = await studentRepository.deleteById(studentId);
        if(!deletedStudent){
            const error = new Error("Student with given ID not available for deletion");
            error.statusCode = 404;
            throw error;

        }
        return res.status(200).json({
            success: true,
            data: deletedStudent
        });


    } catch (error) {
        
    }
}