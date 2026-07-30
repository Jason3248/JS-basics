import express from "express";
import studentRoutes from './routes/student.routes.js';
const app = express();


app.use(express.json());
app.use('/api/students', studentRoutes);
app.use((req, res) => {
    return res.status(400).json({
        success: false,
        message: `No route available for the path: ${req.originalUrl} and the method: ${req.method}`
    })
})


export default app;