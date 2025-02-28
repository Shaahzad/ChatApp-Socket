import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/Utility.js";
import Chat from '../models/Chat.js'
import { EmitEvent, deleteFilesFromCloudinary } from "../utils/Features.js";
import { ALERT, NEW_ATTACHMENT_ALERT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import User from '../models/user.js'
import Message from '../models/Message.js'
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
 
if(!members || members.length < 1) return next(new ErrorHandler('Members are required', 400))

const chat = await Chat.findById(chatId)

if(!chat) return next(new ErrorHandler('Chat Not Found', 404))
if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat', 404))
if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler('Only group creator can add members', 403))
const allNewMembersPromise = members.map(i=> User.findById(i, "name"))
const allNewMembers = await Promise.all(allNewMembersPromise)
const uniqueMembers = allNewMembers.filter(i=> !chat.members.includes(i._id.toString())
).map(i=> i._id)

chat.members.push(...uniqueMembers)


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

const removeMembers = TryCatch(async(req,res,next)=>{
   
const {userId, chatId} = req.body

const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
])

if(!chat) return next(new ErrorHandler('Chat Not Found', 404))
if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat', 404))
if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler('Only group creator can remove members', 403))
    if(chat.members.length <= 3) {
        return next(new ErrorHandler('Group must have at least 3 members', 400))
    }

chat.members = chat.members.filter(i=> i.toString() !== userId.toString())
await chat.save()

EmitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group`
)

EmitEvent(req, REFETCH_CHATS, chat.members)

    return res.status(200).json({
        success: true,
        message: "Members Removed Successfully"
    })
})


const leaveGroup = TryCatch(async(req,res,next)=>{
const chatId = req.params.id;   
const chat = await Chat.findById(chatId)    
   
if(!chat) return next(new ErrorHandler('Chat Not Found', 404))
if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat', 404))


const remainingmember = chat.members.filter(i=> i.toString() !== req.user.toString())

if(remainingmember.length < 3) {
    return next(new ErrorHandler('Group must have at least 3 members', 400))
}

if(chat.creator.toString() === req.user.toString()) {
const randomNumber =  Math.floor(Math.random() * remainingmember.length)
const newCreator = remainingmember[randomNumber]
chat.creator = newCreator;
}

    chat.members = remainingmember

    const [user] = await Promise.all([
        User.findById(req.user, "name"),
        chat.save()
    ])

    EmitEvent(
        req,
        ALERT,
        chat.members,
        `User ${user.name} has left the group`
    )
        
        return res.status(200).json({
            success: true,
            message: "Members Removed Successfully"
        })
})


const sendAttachments = TryCatch(async(req,res,next)=>{
const {chatId} = req.body
const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name")
])


if(!chat) return next(new ErrorHandler('Chat Not Found', 404))

const files = req.files || []

if(files.length < 1) return next(new ErrorHandler('Files are required', 400))
const attachments = []

const messageForDB = {
    content : "",
    attachments,
    sender: me._id,
    chat: chatId,
}


const messageForRealTime = {
    ...messageForDB,
    sender: {
        _id: me._id,
        name: me.name
    }
};





const message = await Message.create(messageForDB)

EmitEvent(req, NEW_ATTACHMENT_ALERT, chat.members, {
    message: messageForRealTime,
    chatId
})

EmitEvent(req, NEW_MESSAGE_ALERT, chat.members, {chatId})
    
   return res.status(200).json({
       success: true,
       message
   }) 
})


const getChatDetails = TryCatch(async(req,res,next)=>{
if(req.query.populate === "true") {

    const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

    if(!chat) return next(new ErrorHandler("Chat Not Found"), 404)

    chat.members = chat.members.map(({_id, name, avatar}) => ({
        _id,
        name,
        avatar: avatar.url
    }))

    return res.status(200).json({
        success: true,
        chat
    })
}else{
    const chat = await Chat.findById(req.params.id)

    if(!chat) return next(new ErrorHandler("Chat Not Found"), 404)

    return res.status(200).json({
        success: true,
        chat
    })
}
})



const renameGroup = TryCatch(async(req,res,next)=>{
    const chatId = req.params.id
    const {name} = req.body

    const chat = await Chat.findById(chatId)

    if(!chat) return next(new ErrorHandler('Chat Not Found', 404))

    if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat', 404))

    if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler('Only group creator can rename group', 403))

    chat.name = name

    await chat.save()

    EmitEvent(req, REFETCH_CHATS, chat.members)


    return res.status(200).json({
        success: true,
        message: "Group Renamed Successfully"
    })
})


const deleteChat = TryCatch(async(req,res,next)=>{
    const chatId = req.params.id

    const chat = await Chat.findById(chatId)

    if(!chat) return next(new ErrorHandler('Chat Not Found', 404))

    const members = chat.members

    if(chat.groupChat && chat.creator.toString() !== req.user.toString()) 
    return next(new ErrorHandler('Only group creator can delete group', 403))

    if(!chat.groupChat && !chat.members.includes(req.user.toString())){
        return next(new ErrorHandler('You are not a member of this chat', 403))
    }


    const messageWithAttachments = await Message.find({
        chat: chatId,
        attachments: {
            $exists: true,
            $ne: []
        }
    })
    const public_ids = [];

    messageWithAttachments.forEach(({ attachments }) => {
        attachments.forEach(({ public_id }) => {
            public_ids.push(public_id);
        })
    })
    await Promise.all([
        deleteFilesFromCloudinary(public_ids),
        chat.deleteOne(),
        Message.deleteMany({chat: chatId})
    ])

    EmitEvent(req, REFETCH_CHATS, members)

    return res.status(200).json({
        success: true,
        message: "Chat Deleted Successfully"
    })
})

const getMessage = TryCatch(async(req,res,next)=>{
    
})

export {
    newGroupChat,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMembers,
    leaveGroup,
    sendAttachments,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessage
}
