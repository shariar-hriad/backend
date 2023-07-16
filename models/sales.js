import { model, Schema } from 'mongoose'

const salesSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },
        products: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

const Sales = model('Sales', salesSchema)
export default Sales
