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

const Adminonly = async (req, res, next) => {
    const token = req.cookies['Admin']
    
    
    if(!token) return next(new ErrorHandler("only admin can access", 401))
    const adminId = jwt.verify(token, process.env.JWT_SECRET)
    if(adminId !== process.env.ADMIN_SECRET_KEY) return next(new ErrorHandler("only admin can access", 401))

    
    next()
    }
    

export {
    isAuthenticated,
    Adminonly
}