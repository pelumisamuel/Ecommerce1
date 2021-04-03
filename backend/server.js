// const express = require('express')
// const products = require('./Data/products')
// const dotenv = require('dotenv')

import express from 'express'
import products from './Data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './Routes/productRoutes.js'
import { notFound, errorHandler } from './Middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.use('/api/products', productRoutes)

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
