import studentDetails from "../data/studentDetails.js";

export const getAllStudents = (req, res) => {
    try {
        const { isEnrolled } = req.query;
        let studentData = studentDetails;
        if(isEnrolled) {
            studentData = studentData.filter(student => student.isEnrolled === isEnrolled);
        }
        res.status(200).json(studentData);
    } catch (error) {
        console.log("Error while fetching students : ", error.message);
    }
}

export const getStudentById = (req, res) => {
    try {
        const studentId = Number(req.params.studentId);
        console.log(studentId)
        const studentData = studentDetails.find(student => student.id === studentId);
        console.log(studentData)
        res.status(200).json(studentData);
    } catch (error) {
        console.log("Error while fetching student by ID : ", error.message);
    }
}

export const getStudentsByEnrollment = (req, res) => {
    try {
        const {isEnrolled} = req.query;
        const enrolledStudents = studentDetails.filter(student => student.isEnrolled === isEnrolled);
        res.status(200).json(enrolledStudents);
    } catch (error) {
        console.log("Error while fetching students by enrollment : ", error.message);
    }
}

