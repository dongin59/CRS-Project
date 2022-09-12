const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    cost: {
      type: Number,
      required: [true, 'Please add a integer value'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add a integer value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)