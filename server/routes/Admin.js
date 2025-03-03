import express from 'express'
import { adminlogin, adminlogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from '../controllers/Admin.js'
import { adminloginValidator, ValidateHandle } from '../lib/validator.js'
import { Adminonly } from '../middlewares/Auth.js'

const router = express.Router()



router.post('/verify', adminloginValidator(), ValidateHandle, adminlogin)

router.get("/logout", adminlogout)


//  only admin can access the following routes
router.use(Adminonly)
router.get("/", getAdminData)

router.get("/users", allUsers)

router.get("/chats", allChats)

router.get("/messages", allMessages)

router.get("/stats", getDashboardStats)




export default router