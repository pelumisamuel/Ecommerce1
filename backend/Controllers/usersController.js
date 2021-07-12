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
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
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
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// *** User profile update
// update user profile
// 1. from route put api/users/profile
// 2 access = Private
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
      _id: updatedUSer._id,
      name: updatedUSer.name,
      email: updatedUSer.email,
      isAdmin: updatedUSer.isAdmin,
      token: generateToken(updatedUSer._id),
    })
  } else {
    res.status(401)

    throw new Error('incorrect update details')
  }
})

// *** get all User details for admin

// 1. from route get /api/users
// 2 access = Private

const getUsers = asyncHandler(async (req, res) => {
  //console.log(req)
  const users = await User.find({})

  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  //console.log(req)
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'user has been removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// get user
// 1. from route Get api/users/:id
// 2 access = Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  //console.log(req)
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404).json('request not found')

    throw new Error('User not found')
  }
})

// *** User update
// update user
// 1. from route put api/users/:id
// 2 access = Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUSer = await user.save()

    res.json({
      _id: updatedUSer._id,
      name: updatedUSer.name,
      email: updatedUSer.email,
      isAdmin: updatedUSer.isAdmin,
    })
  } else {
    res.status(404)

    throw new Error('User not found')
  }
})

export {
  getUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
