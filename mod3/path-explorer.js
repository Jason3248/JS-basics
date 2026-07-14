import path from 'node:path';

const fileName = 'annual-report.pdf';
const filePath = path.join(process.cwd(), 'documents', 'reports', fileName);


//Path Parse

const parsedPath = path.parse(filePath);
console.log(parsedPath);
console.log("Root Directory : ", parsedPath.root);
console.log("Parent Directory : ", parsedPath.dir);
console.log("Complete file name : ", parsedPath.base);
console.log("File Extension : ", parsedPath.ext);
console.log("File name w/o extension : ", parsedPath.name);


//Path Format

const pathDetails = {
    name: 'employee-data',
    ext: '.json',
    dir: path.join(process.cwd(), 'backups')
}

const pathString = path.format(pathDetails);
console.log("Path String : ", pathString);


//Path resolve

const resolvedPath = path.resolve('data', 'users', 'users.json');
console.log(resolvedPath);
console.log(path.dirname(resolvedPath));



//Path relative


const reportPath = path.join(process.cwd(), 'documents', 'reports');
const backupPath = path.join(process.cwd(), 'documents', 'backups');


console.log(path.relative(reportPath, backupPath))




//checking isAbsolute

const path3 = path.join('documents', 'notes.txt');
console.log(path.isAbsolute(resolvedPath));
console.log(path.isAbsolute(path3));







