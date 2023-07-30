import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { generateToken } from '../config/jwtToken.js'
import { genRefreshToken } from '../config/refreshToken.js'
import User from '../models/user.js'

// register user
export const registerUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    try {
        // checking if the user is already registered
        const isAlreadyRegistered = await User.findOne({ email })

        if (!isAlreadyRegistered) {
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } else {
            throw new Error('Already registered')
        }
    } catch (error) {
        throw new Error(error)
    }
})

// login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    try {
        // check if user is exists or not
        const isUserExists = await User.findOne({ email })

        if (isUserExists.role !== 'admin') throw new Error('Unauthorized')

        const isPassowrdMatched = await isUserExists.isPasswordMatched(password)

        if (isUserExists && isPassowrdMatched) {
            const refreshToken = genRefreshToken(isUserExists._id.toJSON())

            const updateUser = await User.findByIdAndUpdate(isUserExists._id, { refreshToken }, { new: true })
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 72 * 60 * 60 * 1000 })
            res.status(200).json({
                id: isUserExists._id,
                firstname: isUserExists?.firstname,
                lastname: isUserExists?.lastname,
                email: isUserExists?.email,
                mobile: isUserExists?.mobile,
                token: generateToken(isUserExists._id.toJSON()),
            })
        } else {
            throw new Error('Invalid Credentials')
        }
    } catch (error) {
        throw new Error(error)
    }
})

// handle refreshToken
export const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    try {
        if (!cookie.refreshToken) throw new Error('No Refresh Token in Cookies')

        const refreshToken = cookie.refreshToken

        const user = await User.findOne({ refreshToken })
        if (!user) throw new Error('No Refresh Token present in db or not matched')

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err || user._id.toJSON() !== decoded.id) {
                throw new Error('There is something wrong with refresh token')
            }

            const accessToken = generateToken(user?._id)
            res.json({ accessToken })
        })
    } catch (error) {
        throw new Error(error)
    }
})

// logout
export const logout = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies

        if (!cookie?.refreshToken) throw new Error('No Refresh Token in cookies')

        const refreshToken = cookie.refreshToken
        const user = await User.findOne({ refreshToken })

        if (!user) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: true })

            return res.status(204).json({ message: 'Forbidden Request' })
        }

        await User.findOneAndUpdate(
            { refreshToken },
            {
                refreshToken: '',
            }
        )

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        })

        res.status(204).json({ message: 'Forbidden Request' })
    } catch (error) {
        throw new Error(error)
    }
})

// create a new order
const createOrder = asyncHandler(async (req, res) => {
    try {
        const { COD, phoneNumber } = req.body

        // check if the user is exists or not
    } catch (error) {
        throw new Error(error)
    }
})
