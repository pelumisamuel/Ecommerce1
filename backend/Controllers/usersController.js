import User from '../Models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../Utils/generateTokens.js'

const getUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //console.log(req.body.email)
  const user = await User.findOne({ email })

  const passwordCorrect = await user.matchPassword(password)

  if (user && passwordCorrect) {
    res.status(200)
    // login in
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    })
  } else {
    res.status(401)
    throw new Error('email or username is invalid')

    //throw error
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  //console.log(req)
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404).json('request not found')

    throw new Error('email or username is invalid')
  }
})

export { getUser, getUserProfile }
