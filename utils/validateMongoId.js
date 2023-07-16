import mongoose from 'mongoose'

export const validateMongoId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new Error('Invalid MongoDB id or not found')
}
