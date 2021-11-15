import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// numero pour generation de numeroe
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { Email, password } = req.body

  const user = await User.findOne({ Email })
  if ((user) && ( await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      Pseudo : user.Pseudo,
      Email: user.Email,
      isAdmin: user.isAdmin,
      imgURL : user.imgURL,
      token: generateToken(user._id),
    })
    req.user = user;
  } else {
    res.status(401).json({ message:'Email ou mot de passe incorrect' })
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {  firstName,lastName,Email, password ,imgURL} = req.body

 
  const userExists = await User.findOne({ Email })

  if (userExists) {
    res.status(400).json({ message:'Utilisateur existe deja' })
    // throw new Error('Utilisateur existe deja')
  }
   
  const firstCharacter = firstName.charAt(0)
  const secondCharacter = firstName.charAt(1)
  const firstNumber = getRandomInt(10)
  const secondNumber = getRandomInt(10)
  const thirdNumber = getRandomInt(10)
  const Pseudo =`${firstCharacter}${secondCharacter}${lastName}#${firstNumber}${secondNumber}${thirdNumber}`
   
  const user = await User.create({
    firstName,
    lastName,
    Pseudo,
    Email,
    password,
    imgURL
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      Pseudo: user.Pseudo,
      Email: user.email,
      isAdmin: user.isAdmin,
      imgURL : user.imgURL,
      token: generateToken(user._id),
    })
  } else {
    
    res.status(400).json({ message:'Les données sont incorrectes' })
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (user) {
    res.json(user
    )
  } else {
    res.status(400).json({ message:'Utilisateur non trouve' })
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.Email = req.body.Email || user.Email
    user.imgURL = req.body.imgURL || user.imgURL
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      Email: updatedUser.Email,
      Pseudo: updatedUser.Pseudo,
      isAdmin: updatedUser.isAdmin,
      imgURL: updatedUser.imgURL,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'utilisateur supprimé ' })
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.Email = req.body.Email || user.Email
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.Email = req.body.Email || user.Email
    user.imgURL = req.body.imgURL || user.imgURL

    const updatedUser = await user.save()

    res.json({
      _id: user._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      Pseudo: updatedUser.Pseudo,
      Email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      imgURL : updatedUser.imgURL,
    })
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
