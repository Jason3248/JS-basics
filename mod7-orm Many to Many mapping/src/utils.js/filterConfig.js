import { Op } from "sequelize";

export const studentFilterConfig =  {
    firstName: { op: Op.iLike, transform: value => `%${value}%`},
    lastName: { op: Op.iLike, transform: value => `%${value}%`},
    minAge: {field: 'age', op: Op.gte, transform: Number},
    maxAge: {field: 'age', op: Op.lte, transform: Number},
    city: {field: '$profile.city$', op: Op.iLike, transform: value => `%${value}%`}
};


export const courseFilterConfig = {
    credits: { op: Op.eq, transform: Number}
}