import express from 'express'
import UserRoute from './routes/user.js' 
import chatRoute from './routes/chat.js'
import {connectDb} from './utils/Features.js'
import dotenv from "dotenv"
import {errorMiddleware} from './middlewares/error.js'
import cookieParser from 'cookie-parser'
import { createUser } from './seeders/user.js'

dotenv.config()
const port = process.env.PORT || 5000
const Uri = process.env.MONGO_URI
connectDb(Uri)
// createUser(10)
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/user', UserRoute)
app.use('/chat', chatRoute)

app.use(errorMiddleware)
app.listen(port, () => {
    console.log(`Server is running on ${port}`)       
})