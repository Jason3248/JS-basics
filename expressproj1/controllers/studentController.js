import fs from 'node:fs/promises';
import path from 'node:path';

const dataFilePath = path.resolve('data', 'studentDetails.json');
// console.log(process.cwd());
// console.log(Boolean('true'));



export const getAllStudents = async (req, res) => {
    try {
        const { firstName, lastName, age, active } = req.query;
        // console.log(req.query);
        const rawData = await fs.readFile(dataFilePath, 'utf-8');
        const parsedData = JSON.parse(rawData);
        // if(!parsedData) throw new Error("Parsed data not available");

        let studentArr = parsedData.students;
        if(firstName) studentArr = studentArr.filter(student =>  student.name.toLowerCase().includes(firstName.toLowerCase()));
        if(lastName) studentArr = studentArr.filter(student =>  student.name.toLowerCase().includes(lastName.toLowerCase()));
        if(age) studentArr = studentArr.filter(student => student.age === Number(age));
        if(active) studentArr = studentArr.filter(student => student.active === Boolean(active));

        res.status(200).json(studentArr);

    } catch (error) {
        console.log("Error while fetching data : ", error.message);
    }
}

export const getStudentsById = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        // console.log(studentId);
        const rawData = await fs.readFile(dataFilePath, 'utf-8');
        const parsedData = JSON.parse(rawData);
        // console.log(parsedData);
        // if(!parsedData) throw new Error("Parsed data not available");
        const studentData = parsedData.students.find(student => student.id === studentId);
        if(!studentData) return res.status(404).json({ message: `Student with id : ${studentId} not found.`});
        res.status(200).json(studentData);
    } catch (error) {
        console.log("Error while fetching student by ID : ", error.message);
    }
}

// export const addStudent = async (req, res) => {
//     try {
//          const studentData = req.body;
//         //  console.log(studentData);
//          if(!studentData.id) return res.status(400).json({message: "Student ID Missing from request body"});
//          const rawData = await fs.readFile(dataFilePath, 'utf-8');
//          const parsedData = JSON.parse(rawData);
//         //  if(!parsedData) throw new Error("Parsed data not available");
//          const studentExists = parsedData.students.some(student => student.id == studentData.id);
//          if(studentExists) return res.status(400).json({message : `Student with ID : ${studentData.id} already exists`})
//          parsedData.students = [...parsedData.students, studentData];
//          await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));
//          res.status(201).json({message : `New Student with id ${studentData.id} created successfully`})
//     } catch (error) {
//         console.log("Error while adding new student : ", error.message);
//     }
// }

export const addStudent = async (req, res) => {
    try {
        const { name, age, grade, isActive, courses } = req.body;
        console.log(req.body);
        if(!name || !age || !grade || !isActive || !courses){
            return res.status(400).json({message : "Student details are missing"});
        }
        const rawData = await fs.readFile(dataFilePath, 'utf-8');
        const parsedData = JSON.parse(rawData);
        const newStudentId = parsedData.students.at(-1).id + 1;

        const newStudent = {
            id: newStudentId,
            name,
            age: Number(age),
            grade,
            isActive: Boolean(isActive),
            courses
        };
        console.log(newStudent);
        parsedData.students.push(newStudent);
        await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));
        res.status(201).json({message: `New student with id: ${newStudentId} created successfully`});

    } catch (error) {
        console.log("Error while adding student : ". error.message);
    }
}