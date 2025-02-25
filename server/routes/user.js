import express from 'express'
import { login, newUser } from '../controllers/User.js'
import { SingleAvatar } from '../middlewares/multer.js'
const router = express.Router()

router.post('/new', SingleAvatar, newUser)
router.post('/login', login)



export default router