import { parse } from "dotenv";
import Student from "../models/student.model.js";

export const parseStudentId = id => {
    const studentId = Number(id);
    if(!Number.isInteger(studentId) || studentId <= 0) return null;
    return studentId;
}


export const handleSequelizeError = (error, res) => {
    if(error.name === "SequelizeUniqueConstraintError"){
        return res.status(409).json({
            success: true,
            message: "A student with the provided email ID already exists"
        });
    }

    if(error.name === "SequelizeValidationError"){
        return res.status(400).json({
            success: false,
            message: "Student Validation Failed",
            errors: error.errors.map(err => {
                return {
                    field: err.path,
                    message: err.message
                }
            })
        })
    }

    console.error(error);
    return res.status(500).json({
        success: false,
        message: "An unexpected error occured"
    })
}


export const createStudent = async(req, res) => {
    try {
        const {firstName, lastName, age, email} = req.body;
        const createdStudent = await Student.create({
            firstName, 
            lastName, 
            age, 
            email
        });
        // if(!createdStudent){
        //     return res.status().json({
        //         success: false,
        //         message: "Error while creating student"
        //     })
        // }
        return res.status(201).json({
            success: true,
            message: "Student Created Successfully",
            data: createdStudent
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}



export const getAllStudents = async(req, res) => {
    try {
        const students = await Student.findAll({
            order: [["id", "ASC"]]
        });
        return res.status(200).json({
            success: true,
            count: students.length,
            data: students
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}



export const getStudentById = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });
        }
        const student = await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                message: `Student with id: ${studentId} not found`
            })
        }

        res.status(200).json({
            success: true,
            data: student
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}


export const updateStudent = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });
        }

        const studentData = req.body;
        if(Object.keys(studentData).length === 0){
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            })
        }

        const student = await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({
                success: true,
                message: `Student with id: ${studentId} does not exist for updation`
            })
        }

        const updatedValues = {};
        const allowedFields = [
            "firstName",
            "lastName",
            "age",
            "email"
        ];
        for(const field of allowedFields){
            if(studentData[field] !== undefined){
                updatedValues[field] = studentData[field];
            }
        }
        await student.update(updatedValues);
        return res.status(200).json({
            success: true,
            data: student
        })

    } catch (error) {
        return handleSequelizeError(error, res);
    }
}



export const deleteStudent = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });
        }
        const student = await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                message: `Student with id: ${studentId} not found for deletion`
            })
        }
        await student.destroy();
        console.log(student);
        
        return res.status(200).json({
            success: true,
            message: `Student with id: ${studentId} deleted Successfully`,
            data: student
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}