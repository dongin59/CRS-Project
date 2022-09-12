const express = require('express')
const router = express.Router()
const {
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getProduct).post(setProduct)
router.route('/:id').delete(deleteProduct).put(updateProduct)

module.exports = router