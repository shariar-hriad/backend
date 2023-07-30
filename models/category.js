import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category Name is required'],
            trim: true,
            lowercase: true,
            min: [3, 'Category Name must 3 characters'],
            max: [15, 'Category Name must be less than 15 characters'],
            unique: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
)

const Category = model('Category', categorySchema)

export default Category
