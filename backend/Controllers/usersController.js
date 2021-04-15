import User from '../Models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../Utils/generateTokens.js'

const getUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //console.log(email, password)
  const user = await User.findOne({ email })

  //let passwordCorrect = await user.matchPassword(password)

  if (user && (await user.matchPassword(password))) {
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

// *** User profile creation
// get user profile
// 1. from route Get api/users/profile
// 2 access = Private

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

// *** registering creation
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  //console.log(req.body.email)
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  const newUser = await User.create({
    name,
    email,
    password,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser.id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  //console.log(req)
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUSer = await user.save()

    res.json({
      _id: updatedUSer.id,
      name: updatedUSer.name,
      email: updatedUSer.email,
      isAdmin: updatedUSer.isAdmin,
      token: generateToken(updatedUSer.id),
    })
  } else {
    res.status(404)

    throw new Error('incorrect update details')
  }
})

export { getUser, getUserProfile, registerUser, updateUserProfile }
