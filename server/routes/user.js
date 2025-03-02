import express from 'express'
import { acceptFriendRequest, getMyNotifications, getMyProfile, getMyfriends, login, logout, newUser, searchUser, sendFriendRequest } from '../controllers/User.js'
import { SingleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/Auth.js'
import { RegisterValidator, ValidateHandle, acceptRequestValidator, loginValidator, sendRequestValidator } from '../lib/validator.js'
const router = express.Router()

router.post('/new', SingleAvatar, RegisterValidator(), ValidateHandle, newUser)
router.post('/login', loginValidator(), ValidateHandle,  login)



router.use(isAuthenticated)
router.get('/me', getMyProfile)
router.get('/logout', logout)
router.get('/search', searchUser)
router.put('/sendrequest', sendRequestValidator(), ValidateHandle, sendFriendRequest)
router.put('/acceptrequest', acceptRequestValidator(), ValidateHandle, acceptFriendRequest)
router.get('/notifications', getMyNotifications)
router.get('/friends', getMyfriends)


export default router