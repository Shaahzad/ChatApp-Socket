import User from "../models/user.js"
import bcrypt, { compare } from 'bcrypt'
import { cookieoption, sendToken } from "../utils/Features.js"
import { TryCatch } from "../middlewares/error.js"
import { ErrorHandler } from "../utils/Utility.js"
//  create a new user and save it to the database and save in the cookie
const newUser = async (req, res) => {

    const { name, username, password, bio } = req.body

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
const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')
    if (!user) return next(new ErrorHandler('User Not Found'))

    const isCompare = await compare(password, user.password)
    if (!isCompare) return next(new ErrorHandler('Invalid Password'))

    sendToken(res, user, 200, `Welcome Back ${user.name}`)
})

const getMyProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user)

    res.status(200).json
        ({
            success: true,
            user
        })
})


const logout = TryCatch(async (req, res) => {
  return res.status(200).cookie("chatapp", "", {...cookieoption, maxAge: 0}).json
        ({
            success: true,
            message: "Logout Successfully"
        })
})

const searchUser = TryCatch(async (req, res) => {
    const {name} = req.query;

    const myChats = await Chat.find({groupChat: false, members: req.user})
    // All Users from my chats means friends or people I have chatted with
    const allUserFromMyChats  = myChats.flatMap((chat)=> chat.members)

    const allUsersExceptMeAndFriends = 
    return res.status(200).json({
        success: true,
        allUserFromMyChats
})
})
export {
    login,
    newUser,
    getMyProfile,
    logout,
    searchUser
}