import {db} from "../config/database.js";
import { students } from "../db/schema.js";
import { asc, eq } from "drizzle-orm";

export const findAll = async() => {
    try{
        const studentList = await db.select().from(students).orderBy(asc(students.id));
        return studentList;
    }catch(error){
        console.log("Error while fetching all students : ", error.message);
    }
}


export const findById = async(studentId) => {
    const result = await db.select().from(students).where(eq(students.id, studentId)).limit(1);
    const [student] = result;
    return student;
}

export const findByEmail = async(studentEmail) => {
    const result = await db.select().from(students).where(eq(students.email, studentEmail)).limit(1);
    console.log(result);
    const [student] = result;
    return student;
}

export const create = async(studentData) => {
    const result = await db.insert(students)
                            .values({
                                firstName: studentData.firstName.trim(),
                                lastName: studentData.lastName.trim(),
                                email: studentData.email.trim().toLowerCase(),
                                age: Number(studentData.age)
                            }).returning();
    const [createdStudent] = result;
    return createdStudent;
}


export const updateById = async(studentId, studentData) => {
    const result = await db.update(students)
                            .set(studentData)
                            .where(eq(students.id, studentId))
                            .returning();
    const [updatedStudent] = result;
    return updatedStudent;
}


export const deleteById = async(studentId) => {
    const result = await db.delete(students).where(eq(students.id, studentId)).returning();
    console.log();
    
    const [deletedStudent] = result;
    return deletedStudent;
}