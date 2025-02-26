import express from 'express'
import { getMyProfile, login, logout, newUser, searchUser } from '../controllers/User.js'
import { SingleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/new', SingleAvatar, newUser)
router.post('/login', login)



router.use(isAuthenticated)
router.get('/me', getMyProfile)
router.get('/logout', logout)
router.get('/search', searchUser)


export default router