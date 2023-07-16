import express from 'express'
import {
    createCustomer,
    deleteCustomer,
    getAllCustomer,
    getTotalCustomer,
    updateCustomer,
} from '../controllers/customer.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/total', getTotalCustomer)
router.post('/createCustomer', authMiddleware, createCustomer)
router.get('/allCustomer', getAllCustomer)
router.patch('/updateCustomer/:id', authMiddleware, updateCustomer)
router.delete('/deleteCustomer/:id', authMiddleware, deleteCustomer)

export default router
