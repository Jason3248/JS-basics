const {Op} = require("sequelize");
const {Department} = require("@training/trainee-management-data-model");


class DepartmentService{
    async list(query){
        const {page, limit, offset, pageSize} = pagination(query);
        const where = {};
        if(query.name){
            where.name = {[Op.ilike]: `%${query.name}%`}
        }
        if(query.code){
            where.code = {[Op.ilike]: `%${query.code}%`}
        }

        const {rows, count} = await Department.findAndCountAll({
            where,
            limit,
            offset,
            order: [["id", "ASC"]]
        });

        return {
            rows, count,
            pagination:{
                page,
                pageSize,
                totalPages: Math.ceil(count / limit),
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages
            }
        }
    }

    async get(id){
        const department = await Department.findByPk(id);
        return department;
    }

    async students(id, query){
        const department = await this.get(id);
        const {page, limit, offset, pageSize} = pagination(query);
        const {rows, count} = await Department.findAndCountAll({
            where: {
                departmentId: id
            },
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


    async create(body){
        const department = await Department.create(body);
        return department;
    }

    async update(id, body){
        const department = await this.get(id);
        await department.update(body);
        return department;
    }
    async delete(id){
        const department = await this.get(id);
        await department.destroy();
        return department;
    }

    async restore(id){
        const department = await Department.findByPk(id, {paranoid: false});
        await department.restore();
        return department;
    }
}

module.exports = DepartmentService;