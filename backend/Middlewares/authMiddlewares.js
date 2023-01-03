import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  //console.log(req.headers.authorization)
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith('Bearer')
  //   ) {
  //     console.log('Token found')
  //   } else if (!token) {
  //     res.status(401)
  //     throw new Error('Not authorized, no token')
  //   }

  token = req.headers.authorization.split(' ')[1]

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      //console.log(req)
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
    //console.log('Token found')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized; you are not an admin')
  }
}

export { protect, admin }
