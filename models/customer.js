import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CustomerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        purchasedProduct: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        address: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
)

const Customer = mongoose.model('Customer', CustomerSchema)

export default Customer
