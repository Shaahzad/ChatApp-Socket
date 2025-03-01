import express from 'express'
import { getMyProfile, login, logout, newUser, searchUser } from '../controllers/User.js'
import { SingleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/Auth.js'
import { RegisterValidator, ValidateHandle, loginValidator } from '../lib/validator.js'
const router = express.Router()

router.post('/new', SingleAvatar, RegisterValidator(), ValidateHandle, newUser)
router.post('/login', loginValidator(), ValidateHandle,  login)



router.use(isAuthenticated)
router.get('/me', getMyProfile)
router.get('/logout', logout)
router.get('/search', searchUser)


export default router