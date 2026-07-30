import * as studentRepository from "../repositories/studentRepository.js"

import {parseStudentId, 
        validateStudentData, 
        validateUpdateData} 
from "../utils/studentValidation.js"

export const getAllStudents = async(req, res) => {
    try {
        console.log("Request received");
        const studentList = await studentRepository.findAll();
        console.log(studentList)
        return res.status(200).json({   
            success: true,
            count: studentList.length,
            data: studentList
        });
    } catch (error) {
        
    }
}

export const getStudentById = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.studentId);
        const student = await studentRepository.findById(studentId);
        if(!student){
            const error = new Error(`Student with id: ${studentId} was not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success: true,
            data: student
        })
    } catch (error) {
        
    }
}


// export const getStudentByEmail = async(req, res) => {
//     try {
//         const studentEmail = req.query.email;
//         const student = await studentRepository.findByEmail(studentEmail);
//         if(!student){
//             const error = new Error(`Student with email: ${studentEmail} was not found`);
//             error.statusCode = 404;
//             throw error;
//         }
//         return res.status(200).json({
//             success: true,
//             data: student
//         })
//     } catch (error) {
        
//     }
// }



export const addStudent = async(req, res, next) => {
    try {
        const studentData = req.body;
        console.log(req.body);
        // validateStudentData(studentData);
        // const existingStudent = await studentRepository.findByEmail(studentData.email);
        // if(existingStudent){
        //     const error = new Error("Student email ID must be unique");
        //     error.statusCode = 409;
        //     throw error;
        // }
        const createdStudent = await studentRepository.create(studentData);
        // console.log(createdStudent);
        // if(!createdStudent){
        //     const error = new Error("Error while creating new student");
        //     error.statusCode = 500;
        //     throw error;
        // }
        return res.status(201).json({
            success: true,
            message: `Student with id: ${createdStudent.id} successfully created`,
            data: createdStudent
        })
    } catch (error) {
        console.log("Error while adding student :", error);
        next(error);
    }
}


export const updateStudent = async(req, res) => {
    try {
        const studentData = req.body;
        const studentId = parseStudentId(req.params.studentId);
        validateUpdateData(studentData);
        const existingStudent = await studentRepository.findById(studentId);
        if(!existingStudent){
            const error = new Error(`Student with id: ${studentId} doesnt exist for updation`);
            error.statusCode = 404;
            throw error;
        }
        if(studentData.email){
            const existingEmailStudent = await studentRepository.findByEmail(studentData.email.trim().toLowerCase());
            if(existingEmailStudent && existingEmailStudent.id !== studentId){
            const error = new Error("Student email ID is already in use");
            error.statusCode = 409;
            throw error;
        }
        }
        const updatedStudentData = {...studentData, updatedAt: new Date()}
        const updatedStudent = await studentRepository.updateById(studentId, studentData);
        return res.status(200).json({
            success: true,
            message: `Student with ${studentId} successfully updated`,
            data: updatedStudent
        });

    } catch (error) {
        
    }
}



export const deleteStudentById = async(req, res) => {
    try {
        const studentId = parseStudentId(req.params.studentId);
        // const existingStudent = await studentRepository.findById(studentId);
        const deletedStudent = await studentRepository.deleteById(studentId);

        if(!deletedStudent){
            const error = new Error(`Student with id: ${studentId} doesnt exist for deletion`);
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: `Student with ${studentId} deleted successfully`,
            data: deletedStudent
        })
    } catch (error) {
        
    }
}

