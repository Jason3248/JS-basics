// import { Department, Student } from "../models/index.js";
// import parseIntId from "../utils.js/parseIntId.js";
// import handleSequelizeError from "../middlewares/handleSequelizeError.js";
// import verifyUpdationData from "../utils.js/verifyUpdationData.js";

const {Department, Student} = require('../models/index.js');
const parseIntId = require('../utils.js/parseIntId.js');
const handleSequelizeError = require('../middlewares/handleSequelizeError.js');
const verifyUpdationData = require('../utils.js/verifyUpdationData.js');

const createDepartment = async(req, res) => {
    try {
        const {name, code} = req.body;
        if(!name || !code){
            return res.status(400).json({
                success: false,
                message: "Please Provide the name and code of the department"
            });
        }
        const department = await Department.create({name, code});
        res.status(201).json({
            success: true,
            message: `Department with id :${department.id} created successfully`
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}


const getAllDepartments = async(req, res) => {
    try {
        const departments = await Department.findAll({
            include: {
                model: Student,
                as: "student"
            }
        });
        return res.status(200).json({
            success: true,
            count: departments.length,
            data: departments
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}


const getDepartmentById = async(req, res) => {
    try {
        const deptId = parseIntId(req.params.id);
        if(!deptId){
            return res.status(400).json({
                success: false,
                message: "The department Id should be a positive integer"
            })
        }
        const department = await Department.findByPk(deptId);
        if(!department){
            return res.status(404).json({
                success: false,
                message: `Department with id : ${deptId} not found`
            }) 
        }
        res.status(200).json({
            success: true,
            data: department
        })
    } catch (error) {
        return handleSequelizeError(error, res);
    }
}


const updateDepartment = async(req, res) => {
    try {
        const deptId = parseIntId(req.params.id);
        if(!deptId){
            return res.status(400).json({
                success: false,
                message: "The department Id should be a positive integer"
            })
        }
        // const deptData = req.body;
        const deptData = verifyUpdationData(req.body);
        if(!deptData){
            return res.status(400).json({
                success: false,
                message: `Updation operation requires at least one field`
            })
        }
        const department = await Department.findByPk(deptId);
        if(!department){
            return res.status(404).json({
                success: false,
                message: `Department with id : ${deptId} not found`
            }) 
        }
        await department.update(deptData);
        res.status(200).json({
            success: true,
            message: `Department with id : ${deptId} updated successfully`
        })
    } catch (error) {
        handleSequelizeError(error, res);
    }
}


const deleteDepartment = async(req, res) => {
    try {
        const deptId = parseIntId(req.params.id);
        if(!deptId){
            return res.status(400).json({
                success: false,
                message: "The department Id should be a positive integer"
            })
        }
        const department = await Department.findByPk(deptId);
        if(!department){
            return res.status(404).json({
                success: false,
                message: `Department with id : ${deptId} not found`
            }) 
        }
        await department.destroy();
        return res.status(200).json({
            success: true,
            message: `Department with id: ${deptId} has been deleted successfully`
        })
    } catch (error) {
        handleSequelizeError(error, res);
    }
}

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
}