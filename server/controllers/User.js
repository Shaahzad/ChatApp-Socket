import User from "../models/user.js"
import bcrypt, { compare } from 'bcrypt'
import { EmitEvent, cookieoption, sendToken } from "../utils/Features.js"
import { TryCatch } from "../middlewares/error.js"
import { ErrorHandler } from "../utils/Utility.js"
import Chat from '../models/Chat.js'
import Request from "../models/Request.js"
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js"
import {getOtherMember} from "../lib/helper.js"

//  create a new user and save it to the database and save in the cookie
const newUser = TryCatch(async (req, res) => {

    const { name, username, password, bio } = req.body
    const file = req.file

   if(!file) return next(new ErrorHandler("Please Upload avatar", 400))


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

})

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
    return res.status(200).cookie("chatapp", "", { ...cookieoption, maxAge: 0 }).json
        ({
            success: true,
            message: "Logout Successfully"
        })
})

const searchUser = TryCatch(async (req, res) => {
    const { name = "" } = req.query;
    // finding all my chats
    const myChats = await Chat.find({ groupChat: false, members: req.user })
    // // Extracting All Users from my chats means friends or people I have chatted with
    const allUserFromMyChats = myChats.flatMap((chat) => chat.members);

    // // finding all users except me and my friends
    const allUsersExceptMeAndFriends = await User.find({
        _id: { $nin: allUserFromMyChats },
        name: { $regex: name, $options: 'i' }
    })

    // // // modifying the response
    const users = allUsersExceptMeAndFriends.map(({_id, name, avatar})=>({
        _id, 
        name, 
        avatar: avatar.url
    }))

    return res.status(200).json({
        success: true,
        allUsersExceptMeAndFriends
    })
})

const sendFriendRequest = TryCatch(async (req, res) => {

    const { userId } = req.body

    const request = await Request.findOne({
        $or: [
            { sender: req.user, receiver: userId },
            { sender: userId, receiver: req.user }
        ]
    })

    if (request) return next(new ErrorHandler('Request Already Sent', 400))

    await Request.create({
        sender: req.user,
        receiver: userId
    })

    EmitEvent(req, NEW_REQUEST, [userId], "request")

    return res.status(200).json
        ({
            success: true,
            message: "Friend request Sent"
        })
})

const acceptFriendRequest = TryCatch(async (req, res, next) => {

    const { requestId, accept } = req.body
    const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name")

    if (!request) return next(new ErrorHandler("Request Not Found", 404))

    if (request.receiver._id.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not authorized to accept this request", 401)
      );


    if (!accept) {
        await request.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Request Declined"
        })
    }
    const members = [request.sender._id, request.receiver._id]
    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name} and ${request.receiver.name}`,
        }),
        request.deleteOne(),
    ])

    EmitEvent(req, REFETCH_CHATS, members)

    return res.status(200).json
        ({
            success: true,
            message: "Request Accepted",
            senderId: request.sender._id
        })
})

const getMyNotifications = TryCatch(async (req, res) => {
    const request = await Request.find({ receiver: req.user }).populate("sender", "name avatar")
    const allRequest = request.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
        }
    }))

    return res.status(200).json({
        success: true,
        allRequest
    })
})


const getMyfriends = TryCatch(async (req, res) => {
   const chatId = req.query.chatId

   const chats = await Chat.find({
    members: req.user,
    groupChat: false
   }).populate("members", "name avatar")

   const friends = chats.map(({members}) => {
    const otherUser = getOtherMember(members, req.user)

    return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url
    }
   })

   if (chatId) {
    const chat = await Chat.findById(chatId)
    const availableFriends = friends.filter((friend) => !chat.members.includes(friend._id))

    return res.status(200).json({
        success: true,
        friends: availableFriends
    })

   }
   else{
    return res.status(200).json({
        success: true,
        friends
    })
   }

})

export {
    login,
    newUser,
    getMyProfile,
    logout,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyfriends
}