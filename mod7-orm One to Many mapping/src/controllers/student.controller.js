import { parse } from "dotenv";
import {Student, StudentProfile} from "../models/index.js";
import handleSequelizeError from "../middlewares/handleSequelizeError.js";
import parseIntId from "../utils.js/parseIntId.js";
import verifyUpdationData from "../utils.js/verifyUpdationData.js";


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

export const createStudentProfile = async(req, res) => {
    try {
        const studentId = parseIntId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Student ID should be a valid positive integer"
            });
        }
        const student = await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                message: `Student with id: ${studentId} not found`
            });  
        }
        const existingProfile = await StudentProfile.findOne({
            where: {
                studentId
            }
        });
        if(existingProfile){
            return res.status(409).json({
                success: false,
                message: "A Student profile already exists"
            })
        }
        const studentProfileData = req.body;
        console.log(studentProfileData);
        const createdProfile = await StudentProfile.create({...studentProfileData, studentId});
        return res.status(201).json({
            success: true,
            data: createdProfile
        })

    } catch (error) {
        return handleSequelizeError(error, res);
    }
}


export const getAllStudents = async(req, res) => {
    try {
        const students = await Student.findAll({
            include: {
                model: StudentProfile,
                as: "profile"
            },
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

export const getActiveStudents = async(req, res) => {
    try {
        const students = await Student.findAll({
            include: {
                model: StudentProfile,
                as: "profile",
                where: {isActive: true},
                required: true
            },
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
        const studentId = parseIntId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });
        }
        const student = await Student.findByPk(studentId,
            {
                include: {
                    model: StudentProfile,
                    as: "profile"
                }
            }
        );
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
        const studentId = parseIntId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });
        }

        const studentData = verifyUpdationData(req.body);
        if(!studentData){
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            })
        }

        const student = await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                message: `Student with id: ${studentId} does not exist for updation`
            })
        }

        const updatedValues = {};
        const allowedFields = [
            "firstName",
            "lastName",
            "age",
            "email",
            "departmentId"
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


export const updateStudentProfile = async(req, res) => {
    try {
        const studentId = parseIntId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });  
        }
        const existingProfile = await StudentProfile.findOne({
            where: {
                studentId
            }
        });
        if(!existingProfile){
            return res.status(409).json({
                success: false,
                message: "Student profile doesnt exist for updation"
            })
        }
        const newProfileData = verifyUpdationData(req.body);
        if(!newProfileData){
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            })
        }
        await existingProfile.update(newProfileData);
        return res.status(200).json({
            success: true,
            message: `Profile of the student with id: ${studentId} updated successfully`
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}



export const deleteStudent = async(req, res) => {
    try {
        const studentId = parseIntId(req.params.id);
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
            message: `Student with id: ${studentId} and its associated profile deleted Successfully`,
            data: student
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}





export const deleteStudentProfile = async(req, res) => {
    try {
        const studentId = parseIntId(req.params.id);
        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "Enter a valid numeric student Id"
            });
        }
        const profile = await StudentProfile.findOne({
            where: {
                studentId
            }
        });
        if(!profile){
            return res.status(404).json({
                success: false,
                message: 'Student profile not found for deletion'
            })
        }
        await profile.destroy();
        return res.status(200).json({
            success: true,
            message: "Student profile deleted successfully"
        });
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}


export const updateStudentDepartment = async(req, res) => {
    try {
        const {departmentId} = req.body;
        const student = await Student.findByPk(req.params.id);
        await student.update({
            departmentId
        });
        res.status(200).json({
            success: true,
            message: "department of the student updated successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
}