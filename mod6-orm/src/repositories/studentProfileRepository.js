import {db} from "../config/database.js";
import { studentProfiles } from "../db/schema.js";
import { asc, eq } from "drizzle-orm";

export const fetchAll = async() => {
    try {
        const profileList = await db.select().from(studentProfiles).orderBy(asc(studentProfiles.id));
        return profileList;
    } catch (error) {
        console.log("Error while fetching student profiles : ", error.message);
    }
}

export const fetchById = async(profileId) => {
    try {
        const result = await db.select().from(studentProfiles).where(eq(studentProfiles.id, profileId)).limit(1);
        const [profile] = result;
        return profile;
    } catch (error) {
        console.log("Error while fetching profile by ID : ", error.message);
    }
}

export const create = async(profileDetails) => {
    try {
        const result = await db.insert(studentProfiles)
                                .values({
                                    contactNo: profileDetails.contactNo,
                                    address: profileDetails.address,
                                    studentId: profileDetails.studentId
                                })
                                .returning();
        const [createdProfile] = result;
        return createdProfile;
    } catch (error) {
        console.log("Error while creating student profile : ", error.message);
    }
}

export const updateById = async(profileId, newProfileData) => {
    try {
        const result = await db.update(studentProfiles)
                                .set(newProfileData)
                                .where(eq(studentProfiles.id, profileId))
                                .returning();
        const [updatedProfile] = result;
        return updatedProfile;
    } catch (error) {
        console.log("Error while updating student profile : ". error.message);
    }
}


export const deleteById = async(profileId) => {
    try {
        const result = await db.delete(studentProfiles).where(eq(studentProfiles.id, profileId)).returning();
        const [deletedProfile] = result;
        return deletedProfile;
    } catch (error) {
        console.log("Error while deleting student profile : ", error.message);
    }
}