import {db} from "../config/database.js";
import { asc, eq } from "drizzle-orm";
import {students} from "../db/schema.js";

export const findAll = async() => {
    try {
        const studentList = await db.select().from(students).orderBy(asc(students.id));
        return studentList;
    } catch (error) {
        
    }
}

export const findById = async(studentId) => {
    try {
        const result = await db.select().from(students).where(eq(students.id, studentId)).limit(1);
        const [student] = result;
        return student;
    } catch (error) {
        
    }
}

export const findByEmail = async(email) => {
    try {
        const result = await db.select().from(students).where(eq(students.email, email)).limit(1);
        const [student] = result;
        return student;
    } catch (error) {
        
    }
}

export const create = async(studentData) => {
    try {
        const result = await db.insert(students)
                                .values(
                                    {
                                        firstName: studentData.firstName.trim(),
                                        lastName: studentData.lastName.trim(),
                                        email: studentData.email.trim().toLowerCase(),
                                        age: Number(studentData.age)
                                    }
                                ).returning();
        const [createdStudent] = result;
        console.log("Created Student : ", createdStudent);
        return createdStudent;
    } catch (error) {
        // console.log("Error while creating student : ", error.message);
        throw error;
    }
}

export const updateById = async(studentId, studentData) => {
    try {
        const updatedValues = {};
        if(studentData.firstName){
            updatedValues.firstName = studentData.firstName;
        }
        if(studentData.lastName){
            updatedValues.lastName = studentData.lastName;
        }
        if(studentData.email){
            updatedValues.email = studentData.email;
        }
        if(studentData.age){
            updatedValues.age = studentData.age;
        }
        updatedValues.updatedAt = new Date();

        const result = await db.update(students)
                                .set(updatedValues)
                                .where(eq(students.id, studentId))
                                .returning();
        const [updatedStudent] = result;
        return updatedStudent;
    } catch (error) {
        
    }
}

export const deleteById = async(studentId) => {
    try {
        const result = await db.delete(students)
                                .where(eq(students.id, studentId))
                                .returning();
        const [deletedStudent] = result;
        return deletedStudent;
    } catch (error) {
        
    }
}