import mongoose from "mongoose"
import jwt from "jsonwebtoken"
const cookieoption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    httpOnly: true
}
const connectDb = (uri) => {
    mongoose.connect(uri, {
       dbName: 'ChatApp',
    })
    .then((data) => console.log(`Database connected to ${data.connection.host}`))
    .catch((err) => {
        throw err
    });
 }


 const sendToken = (res,user,code,message) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    return res.status(code).cookie('chatapp', token, cookieoption)
    .json({success: true, message})
 }

 const EmitEvent = (req,event,users,data) => {
  console.log('Emitting Event', event)
 }
export {
    connectDb, sendToken, cookieoption, EmitEvent
} 
    