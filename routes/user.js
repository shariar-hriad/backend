import { Router } from 'express'
import { handleRefreshToken, loginUser, logout, registerUser } from '../controllers/user.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/refreshToken', handleRefreshToken)
// router.get('/cart', getUserCart)

export default router
