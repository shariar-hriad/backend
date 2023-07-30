import asyncHandler from 'express-async-handler'
import Brand from '../models/brand.js'
import { validateMongoId } from '../utils/validateMongoId.js'

// get all brand
export const getBrand = asyncHandler(async (req, res) => {
    try {
        const brands = await Brand.find()
        const brandsLenght = await Brand.countDocuments()

        if (!brands) return res.status(404).json({ success: false, message: 'brand not found' })

        res.status(200).json({ brands, brandsLenght })
    } catch (err) {
        console.log(err)
    }
})

// create a new brand
export const createBrand = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body
        if (!title) return res.status(400).json({ message: 'Invalid Title' })

        const existedBrand = await Brand.findOne({ title })
        if (existedBrand) return res.status(400).json({ message: 'Brand already exists' })

        const brand = await Brand.create({ title })

        res.status(201).json(brand)
    } catch (err) {
        console.log(err)
    }
})

// delete a brand
export const deleteBrand = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoId(id)
        const brand = await Brand.findOne({ _id: id })

        if (!brand) return res.status(404).json({ message: 'Not Found' })

        const deletedBrand = await Brand.findOneAndDelete({ _id: id }, { new: true })
        res.status(204).json(deletedBrand)
    } catch (error) {
        console.log(error)
    }
})
