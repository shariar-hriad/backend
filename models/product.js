import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
