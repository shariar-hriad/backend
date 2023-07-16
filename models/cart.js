import { Schema } from 'mongoose'

const cartSchema = new Schema(
    {
        products: [
            {
                products: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                count: Number,
                price: Number,
            },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderby: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },
    },
    {
        timestamps: true,
    }
)

const Cart = model('Cart', cartSchema)
export default Cart
