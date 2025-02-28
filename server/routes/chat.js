import express from 'express'
import { isAuthenticated } from '../middlewares/Auth.js'
import { addMembers, deleteChat, getChatDetails, getMessage, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from '../controllers/chat.js'
import { attachmentsMulter } from '../middlewares/multer.js'



const router = express.Router()


router.use(isAuthenticated)
router.post('/new', newGroupChat)
router.get('/my', getMyChats)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMembers)
router.put('/removemembers', removeMembers)
router.delete('/leave/:id', leaveGroup)

// attachments
router.post('/message',  attachmentsMulter, sendAttachments)

// Get Message
router.get("/message/:id", getMessage)
// Get Chat Details, rename, Delete
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat)
export default router