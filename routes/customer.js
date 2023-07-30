import express from 'express'
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../controllers/customer.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/all', getCustomers)
router.post('/createCustomer', authMiddleware, createCustomer)
router.patch('/updateCustomer/:id', authMiddleware, updateCustomer)
router.delete('/deleteCustomer/:id', authMiddleware, deleteCustomer)

export default router
