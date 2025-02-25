import express from 'express'
import UserRoute from './routes/user.js' 
import {connectDb} from './utils/Features.js'
import dotenv from "dotenv"


dotenv.config()
const port = process.env.PORT || 5000
const Uri = process.env.MONGO_URI
connectDb(Uri)
const app = express()
app.use(express.json())
app.use('/user', UserRoute)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)       
})