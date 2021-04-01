// const express = require('express')
// const products = require('./Data/products')
// const dotenv = require('dotenv')

import express from 'express'
import products from './Data/products.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.get('/api/products/', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)

  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on  port ${PORT}`
  )
)
