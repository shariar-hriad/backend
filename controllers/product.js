import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Product from '../models/product.js'
import { validateMongoId } from '../utils/validateMongoId.js'

// create product
export const createProduct = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body
        req.body.slug = slugify(title)

        const product = await Product.create(req.body)

        res.status(201).json(product)
    } catch (error) {
        throw new Error(error)
    }
})

// get all products
export const getProducts = asyncHandler(async (req, res) => {
    try {
        const search = req.query.search || ''
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5

        const searchRegExp = new RegExp('.*' + search + '.*', 'i')

        const filter = {
            title: {
                $regex: searchRegExp,
            },
        }

        const products = await Product.find(filter)
        const productsLenght = await Product.countDocuments()

        res.status(200).json({ products, productsLenght })
    } catch (error) {
        throw new Error(error)
    }
})

// get product
export const getProduct = asyncHandler(async (req, res) => {
    try {
        const id = req.params
        validateMongoId(id)

        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        throw new Error(error)
    }
})

// update product
export const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body
        const id = req.params
        validateMongoId(id)

        req.body.slug = slugify(title)
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(product)
    } catch (error) {
        throw new Error(error)
    }
})

// delete product
export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoId(id)

        await Product.findByIdAndDelete({ _id: id }, { new: true })
        res.status(204).json({ message: 'Product deleted successfully' })
    } catch (error) {
        throw new Error(error)
    }
})

// delete all products
export const deleteAllProducts = asyncHandler(async (req, res) => {
    try {
        await Product.deleteMany()
        res.status(204).json({ message: 'Product deleted successfully' })
    } catch (error) {
        throw new Error(error)
    }
})
