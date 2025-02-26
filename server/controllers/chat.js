import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/Utility.js";
import Chat from '../models/Chat.js'
import { EmitEvent } from "../utils/Features.js";

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

EmitEvent(req,)

})




export {
    newGroupChat
}