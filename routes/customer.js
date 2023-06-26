import express from 'express'
import { createCustomer, getAllCustomer, getTotalCustomer, updateCustomer } from '../controllers/customer.js'

const router = express.Router()

router.get('/total', getTotalCustomer)
router.post('/createCustomer', createCustomer)
router.get('/allCustomer', getAllCustomer)
router.patch('/updateCustomer', updateCustomer)

export default router
