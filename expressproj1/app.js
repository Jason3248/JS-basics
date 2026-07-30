import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';

const port = process.env.port ?? 3000;
const app = express();
app.use(express.json());


app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Server running on port : ${port}`));