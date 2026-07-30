import 'dotenv/config'
import app from './app.js';
import { closeDatabaseConnection } from './config/database.js';


const PORT = Number(process.env.port ?? 3000)

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));