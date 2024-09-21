import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// Routers
import usersRouter from './users/users.routes';
import citiesRouter from './cities/cities.routes';

const app: Application = express();

dotenv.config(); // config environment variables
const port = process.env.PORT; // Setup port

// Middleware
app.use(express.json());                        // Parse JSON bodies
app.use(express.urlencoded({ extended: true})); // Parse URL-Encoded bodies
app.use(cors());                                // allows cross-origin
app.use(helmet());                              // Protects server

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views/templates are located
app.set('views', __dirname + '/views');

// Define routes
app.get('/', (req: Request, res: Response)=>{
    res.render('index');
});

// Routers
app.use('/', [usersRouter, citiesRouter]);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});