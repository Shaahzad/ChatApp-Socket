import User from "../models/user.js"
import bcrypt, { compare } from 'bcrypt'
import { sendToken } from "../utils/Features.js"
//  create a new user and save it to the database and save in the cookie
const newUser = async (req, res) => {

const {name, username, password, bio} = req.body

const hashPassword = await bcrypt.hash(password, 10)
    const avatar = {
        public_id: 'shahzad',
        url: 'shahzad'
       }

    const user = await User.create({
        name,
        bio,
        username,
        password: hashPassword,
        avatar
       })    

    sendToken(res, user, 201, 'User Created Successfully')
    
}
const login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username}).select('+password')
    const isCompare = await compare(password, user.password)
    
    if(!user){
        return res.status(400).json({success: false, message: 'User Not Found'})
    }

    if(!isCompare){
        return res.status(400).json({success: false, message: 'Invalid Password'})
    }

   sendToken(res, user, 200, `Welcome Back ${user.name}`)
}


export {
    login,
    newUser
}