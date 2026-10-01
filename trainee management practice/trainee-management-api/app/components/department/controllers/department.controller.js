const {DepartmentService} = require("../services/department.service.js");


class DepartmentController{
    constructor(){
        this.service = new DepartmentService();
    }

    async getDepartments(req, res, next){
        try {
            return res.json(await this.service.list(req.query));
        } catch (error) {
            return next(error);
        }
    }

    async getDepartmentById(req, res, next){
        try {
            const departmentId = req.params.id;
            return res.status(200).json(await this.service.get(departmentId));
        } catch (error) {
            return next(error);
        }
    }

    async getStudents(req, res, next){
        try {
            return res.status(200).json(await this.service.students(req.params.id));
        } catch (error) {
            return next(error);
        }
    }

    async createDepartment(req, res, next){
        try {
            return res.status(201).json(await this.service.create(req.body));
        } catch (error) {
            return next(error);
        }
    }

    async updateDepartment(req, res, next){
        try {
            return res.json(await this.service.update(req.body));
        } catch (error) {
            return next(error);
        }
    }

    async deleteDepartment(req, res, next){
        try {
            return res.json(await this.service.delete(req.params.id));
        } catch (error) {
            return next(error)
        }
    }

    async restoreDepartment(req, res, next){
        try {
            res.json(await this.service.restore(req.params.id));
        } catch (error) {
            
        }
    }
}

module.exports = DepartmentController;