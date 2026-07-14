import fs from 'node:fs/promises'

// const filePath = './db.txt';

// async function fetchData(path){
//     try {
//         const data = await fs.readFile(path, 'utf-8');
//         console.log(data);
//     } catch (error) {
//         console.log("Error while reading file : ", error.message);
//     }
// }

// async function writeData(path, text){
//     try {
//         await fs.writeFile(path, `${text}\n`, {flag: 'a'});
//     } catch (error) {
//         console.log("Error while writing to file : ", error.message);
//     }
// }

// // writeData(filePath, "New Text 3");
// // fetchData(filePath);



// const JSONFilePath = './userDetails.json';

// async function fetchDataFromJSON(path) {
//     try {
//         const jsonString = await fs.readFile(path, 'utf-8');
//         const obj = JSON.parse(jsonString);
//         return obj;
//     } catch (error) {
//         console.log("Error while reading JSON file : ", error.message);
//     }
// }

// async function displayJSONData(path){
//     try {
//         const obj = await fetchDataFromJSON(path);
//         console.log(obj);
//     } catch (error) {
//         console.log("Error while displaying data : ", error.message)   
//     }
// }

// async function writeJSONData(path, data){
//     try {
//         const obj = await fetchDataFromJSON(path);
//         const newObj = {...obj, ...data};
//         const jsonNewString = JSON.stringify(newObj, null, 2);
//         await fs.writeFile(path, jsonNewString);

//     } catch (error) {
//         console.log("Error while writing to JSON File : ", error.message);
//     }
// }

// async function main(){
//     await displayJSONData(JSONFilePath);
//     await writeJSONData(JSONFilePath, {"weight": 70});
//     await displayJSONData(JSONFilePath);
// }

// main();



import path from 'node:path';

const fileName = 'db.txt';
const filePath = path.join(process.cwd(), 'data', fileName);

console.log(path);
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.basename(filePath));
