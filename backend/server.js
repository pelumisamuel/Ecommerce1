// const express = require('express')
// const products = require('./Data/products')
// const dotenv = require('dotenv')

import express from 'express'
import morgan from 'morgan'
import products from './Data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './Routes/productRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import { notFound, errorHandler } from './Middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//error middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on  port ${PORT}`.yellow
      .bold
  )
)
