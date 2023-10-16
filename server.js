import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { mongoDb }  from './config/dbConfig.js';
import router from './routes/root.js';  


// Extracts the file name path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
const PORT = process.env.PORT || 7000;


//connect to DB
mongoDb();

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', router)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '/views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//Start the server
mongoose.connection.once( "open", ()=> {
    console.log('Starting Server');

app.listen(PORT, () =>
console.log(`SERVER RUNNING ON PORT ${PORT}`));
});