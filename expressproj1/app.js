import express from 'express';
import studentRoutes from './routes/studentRoutes.js';

const port = process.env.port ?? 3000;
const app = express();
app.use(express.json());


app.use('/api/students', studentRoutes);

app.listen(port, () => console.log(`Server running on port : ${port}`));