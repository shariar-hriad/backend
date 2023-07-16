import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { errorHandler, notFound } from './middleware/errorHandler.js'
import routes from './routes/index.js'

dotenv.config()
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to the App' })
    next()
})

app.use('/api/v1/', routes)

// error handler
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || '5001'
mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(port, () => {
            console.log(`Server listenning on port ${port}`)
        })
    )
    .catch((err) => console.log(err))
