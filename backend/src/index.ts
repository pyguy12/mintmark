import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { run as connectToDB } from './databaseConnection';

const app = express();
const port = process.env.PORT;

// Define an async function for starting the server
async function startServer() {
    try {
        // Attempt to connect to the database
        await connectToDB();

        // Define your routes
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        // Start the server only if the database connection is successful
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to database, server not started', err);
        process.exit(1); // Exit the process with a "failure" code
    }
}

// Call the async function to start the server
startServer();
