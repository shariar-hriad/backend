import Customer from '../models/customer.js'
import { validateMongoId } from '../utils/validateMongoId.js'

// customer length
export const getCustomers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const pageSize = Number(req.query.pageSize) || 5
        // const sort = req.query.sort || null
        const search = req.query.search || ''

        // console.log(page, pageSize, search)

        const searchRegex = new RegExp('.*' + search + '.*', 'i')

        const filter = {
            $or: [{ name: { $regex: searchRegex } }, { phoneNumber: { $regex: searchRegex } }],
        }
        // query all the customers
        const customers = await Customer.find(filter)
            .limit(pageSize * 1)
            .skip((page - 1) * pageSize)
            .sort({ createdAt: -1 })

        const customersLenght = await Customer.countDocuments()

        if (!customers) res.status(404).json({ message: 'No Customers Found' })

        res.status(200).json({
            customers,
            customersLenght,
        })
    } catch (error) {
        throw new Error(error.message)
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
