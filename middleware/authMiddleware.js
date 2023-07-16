import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: decodedToken?.id })
            req.user = user
            next()
        } else {
            throw new Error('Not Authorized')
        }
    } catch (error) {
        throw new Error('There is no token attached to the header')
    }
})

export const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.user
        const admin = await User.findOne({ email })
        if (admin.role !== 'admin') {
            throw new Error('Your are not allowed')
        } else {
            next()
        }
    } catch (error) {
        throw new Error(error)
    }
})
