//require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';

import express from 'express';
const app= express();

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is listening at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB connection failled !!!", err)
})
















/*
import mongoose from 'mongoose'
import { DB_NAME } from './constants';
import express from 'express'
const app = express();
//; for cleaning
;(async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error: ",error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })

    }catch(error){
        console.error("Error: ",error)
        throw err
    }
})()
*/