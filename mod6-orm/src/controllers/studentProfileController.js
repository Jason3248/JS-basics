import * as studentProfileRepository from "../repositories/studentProfileRepository.js"
import { validateProfileData, validateUpdateData, parseProfileId } from "../utils/studentProfileValidation.js";

export const getAllProfiles = async(req, res) => {
    try {
        const profileList = await studentProfileRepository.fetchAll();
        return res.status(200).json({
            success: true,
            count: profileList.length,
            data: profileList
        });
    } catch (error) {
        console.log("Error : ", error.message);
    }
}

export const getProfileById = async(req, res) => {
    try {
        const profileId = parseProfileId(req.params.profileId);
        const profile = await studentProfileRepository.fetchById(profileId);
        if(!profile){
            const error = new Error(`Profile with id : ${profileId} not available`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success: true,
            data: profile
        })
    } catch (error) {
        console.log(`Error : `, error.message);
    }
}


export const addProfile = async(req, res) => {
    try {
        const profileData = req.body;
        validateProfileData(profileData);
        const createdStudent = await studentProfileRepository.create(profileData);
        return res.status(201).json({
            success: true,
            data: createdStudent
        })
    } catch (error) {
        
    }
}