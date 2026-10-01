const {StudentService} = require('../services/student.service.js');


class StudentController{
    constructor(){
        this.service = new StudentService();
    }

    async getStudents(req, res, next){
        try {
            return res.json(await this.service.list(req.query))
        } catch (error) {
            return next(error);
        }
    }

    async getStudentById(req, res, next){
        try {
            return res.json(await this.service.get(req.params.id))
        } catch (error) {
            return next(error);
        }
    }

    async getDepartment(req, res, next){
        try {
            return res.json(await this.service.department(req.params.id));
        } catch (error) {
            return next(error);
        }
    }

    async createStudent(req, res, next){
        try {
            return res.status(201).json(await this.service.create(req.body));
        } catch (error) {
            return next(error);
        }
    }

    async updateStudent(req, res, next){
        try {
            return res.json(await this.service.update(req.body));
        } catch (error) {
            return next(error);
        }
    }


    async deleteStudent(req, res, next){
        try {
            return res.json(await this.service.delete(req.params.id));
        } catch (error) {
            return next(error);
        }
    }

    async restoreStudent(req, res, next){
        try {
            return res.json(await this.service.restore(req.params.id))
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = StudentController;