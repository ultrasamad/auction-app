const mongoose = require('mongoose');

const Product = mongoose.model(
  'Product',
  new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      description: {
        type: String
      },
      initialPrice: {
        type: Number,
        require: true,
      },
      currentPrice: {
        type: Number,
        require: true,
      },
      imageUrl: {
        type: String,
        require: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
      biddingStatus: {
        type: mongoose.Schema.Types.String,
        default: "IDLE", //IDLE, ACTIVE, ENDED
      },
      autoBid: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
      }
    },
    { timestamps: true },
  ),
);

module.exports = Product;
