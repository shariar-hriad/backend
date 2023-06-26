import express from 'express'
import brandRoute from './brand.js'
import customerRoute from './customer.js'

const router = express.Router()

router.use('/brand', brandRoute)
router.use('/customer', customerRoute)

export default router
