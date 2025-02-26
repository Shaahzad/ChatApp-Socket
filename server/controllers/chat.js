import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/Utility.js";
import Chat from '../models/Chat.js'
import { EmitEvent } from "../utils/Features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import User from '../models/user.js'

const newGroupChat = TryCatch(async (req,res,next)=>{
const {name, members} = req.body

if(members.length < 2) return next(new ErrorHandler('At least 2 members are required', 400))


const allMembers = [...members, req.user]

await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers
})

EmitEvent(req, ALERT, allMembers, `Welcome to ${name} group chat`)
EmitEvent(req, REFETCH_CHATS, members)

return res.status(201).json({
    success: true,
    message: "Group Created"
})
})

const getMyChats = TryCatch(async (req,res,next)=>{
    
    const chats = await Chat.find({members: req.user})
    .populate("members", "name avatar")
    
const transformedChats = chats.map(({_id, name, groupChat, members})=>{
const otherMember =  getOtherMember(members, req.user)

return {
    _id,
    groupChat, 
    avatar:groupChat?members.slice(0,3).map(({avatar})=> avatar.url):[otherMember.avatar.url],
    name: groupChat?name:otherMember.name,
    members: members.reduce((prev, curr)=>{
    if(curr._id.toString() !== req.user.toString()){
        prev.push(curr._id)
    }
    return prev
    },[])
}
})
    return res.status(200).json({
        success: true,
        chats: transformedChats
    })
    })


const getMyGroups = TryCatch(async(req,res,next)=>{
const chats = await Chat.find({members: req.user, groupChat: true, creator: req.user}).populate("members", "name avatar")
const groups = chats.map(({_id, name, groupChat, members})=>({
_id,
groupChat,
name,
avatar: members.slice(0,3).map(({avatar})=> avatar.url)
}));
return res.status(200).json({
    success: true,
    groups
})
})


const addMembers = TryCatch(async(req,res,next)=>{
   
const {chatId, members} = req.body
 
if(!members) return next(new ErrorHandler('Members are required', 400))

const chat = await Chat.findById(chatId)

if(!chat) return next(new ErrorHandler('Chat Not Found', 404))
if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat', 404))
if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler('Only group creator can add members', 403))
const allNewMembersPromise = members.map(i=> User.findById(i, "name"))
const allNewMembers = await Promise.all(allNewMembersPromise)
chat.members.push(...allNewMembers.map(i=> i._id))

if(chat.members.length > 10){
    return next(new ErrorHandler('Group can have only 10 members', 400))
}

await chat.save()
const allUsersName = allNewMembers.map(i=> i.name).join(', ')

EmitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added in the group`
)

EmitEvent(req, REFETCH_CHATS, chat.members)

    return res.status(200).json({
        success: true,
        message: "Members Added Successfully"
    })
    })

export {
    newGroupChat,
    getMyChats,
    getMyGroups,
    addMembers
}
