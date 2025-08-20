const mongoose = require('mongoose')
const { encrypt } = require('../helpers/common')
const Users = mongoose.model('Users')
const jwt = require('jsonwebtoken')

exports.createUsers = async (req, res) => {
  try {
    const { name = '', password = '' } = req.body
    if (!name || !password) {
      return res.status(400).json('Name and password are required!')
    }

    const existingUser = await Users.findOne({ name })
    if (existingUser) {
      return res.status(400).json('User already exists!')
    }
    const hashedPassword = encrypt(password)
    if (!hashedPassword) {
      return res.status(500).json('Failed to encrypt password!')
    }
    const user = new Users({ name: name, password: hashedPassword })
    const saveToDB = await user.save()
    if (saveToDB) {
      const token = jwt.sign({ id: saveToDB._id }, process.env.JWT_SECRET, {
        expiresIn: '6h'
      })
      return res.status(200).json({
        message: 'User created successfully!',
        token: token,
        user: user
      })
    }

    return res.status(500).json('Failed to create user!')
  } catch (error) {
    console.error('createUsers ', error)
    return res.status(500).json('An error occurred!')
  }
}
exports.loginUser = async (req, res) => {
  try {
    const { name = '', password = '' } = req.body
    if (!name || !password) {
      return res.status(400).json('Name and password are required!')
    }

    const existingUser = await Users.findOne({ name })
    if (!existingUser) {
      return res.status(400).json('Invalid credentials!')
    }
    const hashedPassword = encrypt(password)
    if (!hashedPassword || existingUser.password !== hashedPassword) {
      return res.status(500).json('Invalid Password')
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: '6h'
    })

    return res.status(200).json({message: 'Login successful!', token: token, user: existingUser })
  } catch (error) {
    console.error('loginUser ', error?.message)
    return res.status(500).json('An error occurred!')
  }
}
exports.loggedUser = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (e) {
    console.error(e.message)
    res.status(500).json('An error occurred while getting admin')
  }
}
