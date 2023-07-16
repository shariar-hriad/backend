import { Schema, model } from 'mongoose'

const BrandSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
)

const Brand = model('Brand', BrandSchema)

export default Brand
