import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import studentProfileRoutes from './routes/studentProfileRoutes.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();

app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/profiles', studentProfileRoutes);
app.use(notFoundHandler);
app.use(errorHandler)
export default app;