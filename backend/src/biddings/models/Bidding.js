const mongoose = require('mongoose');

const Bidding = mongoose.model(
  'Bidding',
  new mongoose.Schema(
    {
      userId: {
        type: String,
        require: true,
      },
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
      bidAmount: {
        type: Number,
        required: true
      },
      bidTime: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true },
  ),
);

module.exports = Bidding;
