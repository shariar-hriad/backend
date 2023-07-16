import { model, Schema } from 'mongoose'

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    count: Number,
    orderStatus: {
        type: String,
        default: 'Not Proccessed',
        enum: ['Not Proccessed', 'Cash on Delivery', 'Processing', 'Cancelled'],
    },
    orderby: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
})

const Order = model('Order', orderSchema)
export default Order
