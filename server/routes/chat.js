import express from 'express'
import { isAuthenticated } from '../middlewares/Auth.js'
import { addMembers, deleteChat, getChatDetails, getMessage, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from '../controllers/chat.js'
import { attachmentsMulter } from '../middlewares/multer.js'
import { ValidateHandle, addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator } from '../lib/validator.js'



const router = express.Router()


router.use(isAuthenticated)
router.post('/new', newGroupValidator(), ValidateHandle, newGroupChat)
router.get('/my', getMyChats)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMemberValidator(), ValidateHandle, addMembers)
router.put('/removemembers', removeMemberValidator(), ValidateHandle, removeMembers)
router.delete('/leave/:id', chatIdValidator(), ValidateHandle, leaveGroup)

// attachments
router.post('/message',  attachmentsMulter, sendAttachmentsValidator(), ValidateHandle, sendAttachments)

// Get Message
router.get("/message/:id", chatIdValidator(), ValidateHandle, getMessage)
// Get Chat Details, rename, Delete
router.route("/:id").get(chatIdValidator(), ValidateHandle, getChatDetails)
.put(renameValidator(), ValidateHandle, renameGroup)
.delete(chatIdValidator(), ValidateHandle, deleteChat)
export default router