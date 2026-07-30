import 'dotenv/config';
import studentRoutes from './routes/studentRoutes.js'
import express from 'express';


const app = express();

app.listen(process.env.PORT || 5000);
app.use(express.json());
app.use('/api/students', studentRoutes);




