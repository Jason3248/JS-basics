export const parseProfileId = id => {
    const studentId = Number(id);
    if(!Number.parseInt(studentId) || studentId <= 0){
        const error = new Error("Student ID must be a positive integer");
        error.statusCode = 400;
        throw error;
    }
    return studentId;
}

export const validateProfileData = data => {
    if(!data.contactNo || !data.address){
        const error = new Error("Contact no and address are required");
        error.statusCode(400);
        throw error;
    }
}

export const validateUpdateData = data => {
    if(Object.keys(data).length === 0){
        const error = new Error("Update operation should pass at least one field");
        error.statusCode = 400;
        throw error;
    }
}