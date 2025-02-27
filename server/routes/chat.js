import express from 'express'
import { isAuthenticated } from '../middlewares/Auth.js'
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, sendAttachments } from '../controllers/chat.js'
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
export default router