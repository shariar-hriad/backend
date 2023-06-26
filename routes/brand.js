import express from 'express'
import { createBrand, deleteBrand, getBrand } from '../controllers/brand.js'

const router = express.Router()

router.get('/getBrand', getBrand)
router.post('/createBrand', createBrand)
router.delete('/:id', deleteBrand)

export default router
