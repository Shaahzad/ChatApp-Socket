import express from 'express'
import { getMyProfile, login, logout, newUser, searchUser } from '../controllers/User.js'
import { SingleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/Auth.js'
import { newGroupChat } from '../controllers/chat.js'



const router = express.Router()


router.use(isAuthenticated)
router.post('/new', newGroupChat)


export default router