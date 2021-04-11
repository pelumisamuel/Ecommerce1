import User from '../Models/userModel.js'
import asyncHandler from 'express-async-handler'

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
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('email or username is invalid')

    //throw error
  }
})

export { getUser }
