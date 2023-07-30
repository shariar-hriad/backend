import { Router } from 'express'
import { createProduct, deleteProduct, getProducts } from '../controllers/product.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/all', getProducts)
router.post('/create-product', authMiddleware, createProduct)
router.delete('/delete-product/:id', authMiddleware, deleteProduct)

export default router
