import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BrandSchema = new Schema(
    {
        title: String,
    },
    {
        timestamps: true,
    }
)

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand
