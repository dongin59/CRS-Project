const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')

// @desc    Get product
// @route   GET /api/products
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find()

  res.status(200).json(products)
})

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  const { name, cost, stock } = req.body

  if (!name || !cost || !stock) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const product = await Product.create({
    name,
    cost,
    stock,
    //user: req.user.id,
  })

  res.status(200).json(product)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const { cost, order } = req.body

  // if (!cost || !order) {
  //   res.status(400)
  //   throw new Error('Please add all fields')
  // }

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('Product not found')
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedProduct)
})

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('Product not found')
  }

  await product.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
}