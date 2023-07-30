import asyncHandler from 'express-async-handler'
import Category from '../models/category.js'
import { createNewCategory } from '../services/categoryServices.js'
import { validateMongoId } from '../utils/validateMongoId.js'

// create category route
export const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body

        const category = await createNewCategory(name)

        res.status(200).json(category)
    } catch (error) {
        throw new Error(error)
    }
})

// get category route
export const getCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find()

        if (!category) res.status(404).json({ message: 'Category not found' })

        res.status(200).json(category)
    } catch (error) {
        throw new Error(error)
    }
})

// delete category
export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoId(id)

        const category = await Category.findOneAndDelete({ _id: id })

        res.status(204).json(category)
    } catch (error) {
        throw new Error(error)
    }
})
