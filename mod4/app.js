import express from 'express';
import { studentDetails } from './data/studentDetails.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

const port = process.env.PORT ?? 5000;

app.use(express.json());

app.use('/api/students', studentRoutes);


app.listen(port, () => console.log(`Server running on PORT : ${port}`));