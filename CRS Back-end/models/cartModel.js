const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    cost: {
      type: Number,
      required: [true, 'Please add a integer value'],
    },
    order: {
      type: Number,
      required: [true, 'Please add a integer value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Cart', cartSchema)