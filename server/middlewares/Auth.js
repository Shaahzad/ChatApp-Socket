import { ErrorHandler } from "../utils/Utility.js";
import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
const token = req.cookies['chatapp']


if(!token) return next(new ErrorHandler("Login First", 401))
const decodedData = jwt.verify(token, process.env.JWT_SECRET)
req.user = decodedData.id
// console.log(decodedData)
next()
}


export {
    isAuthenticated
}