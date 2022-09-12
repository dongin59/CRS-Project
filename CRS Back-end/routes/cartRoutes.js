const express = require('express')
const router = express.Router()
const {
  getCart,
  setCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCart).post(protect, setCart)
router.route('/:id').delete(protect, deleteCart).put(protect, updateCart)

module.exports = router