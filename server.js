import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import { mongoDb }  from './config/dbConfig.js';  



const app = express();
dotenv.config();
const PORT = process.env.PORT || 7000;

//connect to DB
mongoDb();


mongoose.connection.once( "open", ()=> {
    console.log('Starting Server');

app.listen(PORT, () =>
console.log(`SERVER RUNNING ON PORT ${PORT}`));
});