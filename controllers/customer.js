import mongoose from 'mongoose'
import Customer from '../models/customer.js'

// customer length
export const getTotalCustomer = async (req, res) => {
    try {
        const total = await Customer.countDocuments()

        res.status(200).json({
            sucess: true,
            total: total,
        })
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

        res.status(201).json({
            customer: newCustomer,
        })
    } catch (error) {
        console.log(error)
    }
}

// get all customer
export const getAllCustomer = async (req, res) => {
    try {
        const customer = await Customer.find()

        if (customer.length === 0) return res.status(404).json({ success: false, message: 'Customer not found' })

        res.status(200).json({ customer })
    } catch (error) {
        console.log(error)
    }
}

// update customer
export const updateCustomer = async (req, res) => {
    try {
        const validId = mongoose.Types.ObjectId.isValid(req.params.id)

        if (!validId)
            return res.status(404).json({
                success: false,
                message: 'Customer does not exist',
            })

        const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, { ...req.body })

        res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            customer: customer,
        })
    } catch (error) {
        console.log(error)
    }
}
