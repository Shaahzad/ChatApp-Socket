import { TryCatch } from "../middlewares/error.js";
import User from "../models/user.js"
import Chat from "../models/Chat.js"
import Message from "../models/Message.js"
import { ErrorHandler } from "../utils/Utility.js";
import jwt from "jsonwebtoken"
import { cookieoption } from "../utils/Features.js";
const adminlogin = TryCatch(async (req, res, next) => {
const {secretkey} = req.body

const isMatch = secretkey === process.env.ADMIN_SECRET_KEY

if(!isMatch)return  next(new ErrorHandler("Invalid Admin Secret Key", 401))

const token = jwt.sign(secretkey, process.env.JWT_SECRET);

return res.status(200).cookie("Admin", token, {...cookieoption, maxAge: 1000 * 60 *15}).json({
    success: true,
    message: "Admin Logged In"
})

})

const adminlogout = TryCatch(async (req, res) => {
    return res.status(200).cookie("Admin", "", {...cookieoption, maxAge: 0}).json({
        status: "success",
        message: "logged out"
    })
})


const getAdminData = TryCatch(async (req, res) => {
return res.status(200).json({
    admin: true
})
})


const allUsers = TryCatch(async (req, res) => {
    const users = await User.find({})

    const transformedUsers = await Promise.all(users.map(async({ _id, name, avatar, username }) => {
     
        const [groups, friends] = await Promise.all([
            Chat.countDocuments({groupChat: true, members: _id}),
            Chat.countDocuments({groupChat: false, members: _id}),
    ])
    
            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends
            }
        }))
    return res.status(200).json({
        status: "success",
        users: transformedUsers
    })
})


const allChats = TryCatch(async(req,res)=>{
const chats = await Chat.find({})
.populate("members", "name avatar")
.populate("creator", "name avatar")

const transformedChat = await Promise.all(chats.map(async ({members, _id, groupChat, name, creator})=>{
    const totalmessages = await Message.countDocuments({chat: _id})
    return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0,3).map((member)=> member.avatar.url),
        members: members.map(({_id, name, avatar})=> ({
           _id,
           name,
           avatar: avatar.url
        })),
        creator: {
            name: creator?.name || "None",
            avatar: creator?.avatar.url || ""
        },
        totalMembers: members.length,
        totalmessages
    }
}))


return res.status(200).json({
    status: "success",
    transformedChat
})

})


const allMessages = TryCatch(async (req, res) => {
    const messages = await Message.find({}).populate("sender", "name avatar")
    .populate("chat", "groupChat")

    const transformedmessages = messages.map(({ content, attachments, _id, sender, createdAt, chat }) => ({
        _id,
        attachments,
        content,
        createdAt,
        chat: chat._id,
        groupChat: chat.groupChat,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
        }
    }))

    return res.status(200).json({
        status: "success",
        messages: transformedmessages
    })
})

const getDashboardStats = TryCatch(async (req, res) => {
const [groupsCount, usersCount, messagesCount, totalchatsCount] = await Promise.all([
    Chat.countDocuments({groupChat: true}),
    User.countDocuments(),
    Message.countDocuments(),
    Chat.countDocuments()
])

const today = new Date()

const last7days = new Date()

last7days.setDate(today.getDate() - 7)

const last7daysMessages = await Message.find({
    createdAt: {
        $gte: last7days,
        $lte: today
    }
}).select("createdAt")

const messages = new Array(7).fill(0)
const dayinmilliseconds = 1000*60*60*24

last7daysMessages.forEach(message => {
    const indexApprox = (today.getTime()-message.createdAt.getTime())/(dayinmilliseconds)
    const index = Math.floor(indexApprox)
    messages[6-index]++
})



const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalchatsCount,
    messagesChart: messages
}
return res.status(200).json({
    status: "success",
    stats
})
})



export { 
    allUsers,
    allChats,
    allMessages,
    getDashboardStats,
    adminlogin,
    adminlogout,
    getAdminData
 }