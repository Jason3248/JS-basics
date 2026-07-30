import fs from 'node:fs/promises';
import path from 'node:path';
import bcrypt from 'bcrypt';

const dataFilePath = path.resolve('data', 'users.json');

export const register = () => {
    try {
        const { name, password } = req.body;
        if(!name || !password){
            return res.status(400).json({message: "Missing field values"});      
        }
        const rawData = await fs.readFile(dataFilePath, 'utf-8');
        const parsedData = JSON.parse(rawData);
        let newUserId = parsedData.users.length === 0 ? 1 : parsedData.users.at(-1).id + 1;
        const userExists = parsedData.users.some(user => user.id === newUserId);
        if(userExists){
            return res.status(400).json({message : `user with id: ${newUserId} already exists`});
        }
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password, saltRounds);
        const newUser = {
            id: newUserId,
            name,
            password: hashedPassword
        }
        parsedData.users.push(newUser);
        await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));
        res.status(201).json({ message: `New User Created Successfully`});
    } catch (error) {
        console.log("Error while registering user : ")
    }
}