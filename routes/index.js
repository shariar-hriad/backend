import express from 'express'
import brandRoute from './brand.js'
import categoryRoute from './category.js'
import customerRoute from './customer.js'
import productRoute from './product.js'
import authRoute from './user.js'

const router = express.Router()

router.use('/brand', brandRoute)
router.use('/customer', customerRoute)
router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/category', categoryRoute)

export default router
