import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public")) //name of the folder to store assets
app.use(cookieParser())


// routes
import userRouter from './routes/user.routes.js'

// app.get worked when all code was in a single file...now routes controllers are separate
// routes declaration
app.use('/api/v1/users', userRouter) 
// http://localhost:8000/api/v1/users/register

export {app}