const {Student, Department} = require("@training/trainee-management-data-model");
const {Op} = require("sequelize");

class StudentService{
    async list(query){
        const {page, limit, offset, pageSize} = pagination(query);
        const where = {};
        // if(query.firstName){
        //     where.firstName = {[Op.ilike]: `%${query.firstName}%`}
        // }
        // if(query.lastName){
        //     where.lastName = {[Op.ilike]: `%${query.lastName}%`}
        // }
        if(query.minAge){
            where.minAge = {[Op.gte]: query.minAge}
        }
        if(query.maxAge){
            where.maxAge = {[Op.lte]: query.maxAge}
        }
        const {rows, count} = await Student.findAndCountAll({
            where,
            include: [
                {
                    model: Department,
                    as: "department"
                }
            ],
            limit,
            offset,
            order: [["id", "ASC"]]
        });
        return {
            rows,
            count,
            pagination: {
                page,
                pageSize,
                totalPages: Math.ceil(count / limit),
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages
            }
        }
    }

    async get(id){
        const student = await Student.findByPk(id,
            {
                include: [{model: Department, as: "department"}]
            }
        );
        return student;
    }
    
    async department(id){
        const department = await Department.findByPk(id);
        return department;
    }


    async create(body){
        const student = await Student.create(data);
        return student;
    }

    async update(id, body){
        const student = await this.get(id);
        await student.update(body);
        return student;
    }

    async delete(id){
        const student = await this.get(id);
        await student.destroy();
        return student;
    }

    async restore(id){
        const student = await Student.findByPk(id, {paranoid: false});
        await student.restore();
        return student;
    }
}

module.exports = StudentService;