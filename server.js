import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import routes from './routes/index.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to the App' })
    next()
})

app.use('/api/v1/', routes)

const port = process.env.PORT || '5001'

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
