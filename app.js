import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
import 'dotenv/config'
import createError from 'http-errors'
import errorHandler from './middlewares/error-handler.js'
import routes from './config/routes.js'

const app = express()

app.use(logger('dev'))
app.use(express.json({ type: ['application/json', 'text/plain'] }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use(routes)

app.use((req, res, next) => {
  next(createError(404))
})

app.use(errorHandler)

export default app