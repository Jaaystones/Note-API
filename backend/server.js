import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { mongoDb }  from './config/dbConfig.js';
import router from './routes/root.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { logger, logEvents } from './middleware/logger.js';
import errorHandler from './middleware/errorHandling.js';
import corsOptions from './config/corsOptions.js';  


// Extracts the file name path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize application
const app = express();
dotenv.config();
const PORT = process.env.PORT || 7000;
console.log(process.env.NODE_ENV);

//connect to DB
mongoDb();

//middlewares
app.use(logger);
app.use(cookieParser()); 
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', router);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '/views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler);

//Start the server with listener.
mongoose.connection.once( "open", ()=> {
    console.log('Starting Server');

app.listen(PORT, () =>
console.log(`SERVER RUNNING ON PORT ${PORT}`));
});

mongoose.connection.once('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});