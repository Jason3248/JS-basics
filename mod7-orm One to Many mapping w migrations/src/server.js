// import "dotenv/config";

// import app from "./app.js";

// import {
//     connectDatabase,
//     synchronizeDatabase
// } from "./config/database.js";
const dotenv = require('dotenv');
dotenv.config();
const connectDatabase = require('./config/database.js');
const app = require('./app.js');

const port = Number(
    process.env.PORT ?? 3000
);

const startServer = async () => {
    try {
        await connectDatabase(); // just authenticate(), no schema changes
        app.listen(port, () => {
                console.log(
                    `Server running at http://localhost:${port}`
                );
            }
        );
    } catch (error) {
        console.error(
            "Application failed to start:",
            error.message
        );

        process.exit(1);
    }
};

startServer();
