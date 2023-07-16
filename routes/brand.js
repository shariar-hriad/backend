import express from 'express'
import { createBrand, deleteBrand, getBrand } from '../controllers/brand.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getBrands', getBrand)
router.post('/createBrand', authMiddleware, createBrand)
router.delete('/delete-brand/:id', authMiddleware, deleteBrand)

export default router
