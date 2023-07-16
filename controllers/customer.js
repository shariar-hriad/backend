import Customer from '../models/customer.js'
import { validateMongoId } from '../utils/validateMongoId.js'

// customer length
export const getTotalCustomer = async (req, res) => {
    try {
        const total = await Customer.countDocuments()

        res.status(200).json(total)
    } catch (error) {
        console.log(error)
    }
}

// create a new customer
export const createCustomer = async (req, res) => {
    try {
        const { name, phoneNumber, address } = req.body
        const existedCustomer = await Customer.findOne({ phoneNumber })

        if (existedCustomer)
            return res.status(400).json({
                success: false,
                message: 'Customer already exists',
            })

        const newCustomer = await Customer.create({ name, phoneNumber, address })

        res.status(201).json(newCustomer)
    } catch (error) {
        console.log(error)
    }
}

// get all customer
export const getAllCustomer = async (req, res) => {
    try {
        const customer = await Customer.find()

        if (customer.length === 0) return res.status(404).json({ success: false, message: 'Customer not found' })

        res.status(200).json(customer)
    } catch (error) {
        console.log(error)
    }
}

// update customer
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params
        validateMongoId(id)
        await Customer.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json({ message: 'Customer Updated successfully' })
    } catch (error) {
        console.log(error)
    }
}

// delete customer
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params
        validateMongoId(id)
        await Customer.findOneAndDelete({ _id: id })
        res.status(204).json({ message: 'Customer deleted successfully' })
    } catch (error) {
        console.log(error)
    }
}
