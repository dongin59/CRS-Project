const asyncHandler = require('express-async-handler')

const Cart = require('../models/cartModel')
const User = require('../models/userModel')

// @desc    Get cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user.id })

  res.status(200).json(cart)
})

// @desc    Set cart
// @route   POST /api/cart
// @access  Private
const setCart = asyncHandler(async (req, res) => {
  const { name, cost, order } = req.body

  if (!name || !cost || !order) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const cart = await Cart.create({
    name,
    cost,
    order,
    user: req.user.id,
  })

  res.status(200).json(cart)
})

// @desc    Update cart
// @route   PUT /api/cart/:id
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const { cost, order } = req.body

  // if (!cost || !order) {
  //   res.status(400)
  //   throw new Error('Please add all fields')
  // }

  const cart = await Cart.findById(req.params.id)

  if (!cart) {
    res.status(400)
    throw new Error('Cart not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the cart user
  if (cart.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedCart)
})

// @desc    Delete cart
// @route   DELETE /api/cart/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id)

  if (!cart) {
    res.status(400)
    throw new Error('Cart not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the cart user
  if (cart.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await cart.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getCart,
  setCart,
  updateCart,
  deleteCart,
}