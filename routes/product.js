import { Router } from 'express'
import { createProduct, getProducts } from '../controllers/product.js'

const router = Router()

router.post('/create-product', createProduct)
router.get('/all', getProducts)

export default router
