import express from 'express'
import { isAuthenticated } from '../middlewares/Auth.js'
import { addMembers, getMyChats, getMyGroups, newGroupChat } from '../controllers/chat.js'



const router = express.Router()


router.use(isAuthenticated)
router.post('/new', newGroupChat)
router.get('/my', getMyChats)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMembers)


export default router