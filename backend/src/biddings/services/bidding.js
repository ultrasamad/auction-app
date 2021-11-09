
const config = require('../../config');
const { Product } = require('../../products/models');
module.exports = class BiddingService {
  constructor(Bidding) {
    this.Bidding = Bidding;
  }

  //Create new Bidding
  async create(params) {
    const  bidding = await this.Bidding.create({
      userId: params.userId,
      productId: params.productId,
      bidAmount: params.bidAmount,
    });

    //Increment product currentPrice by the bid value
    const product = await Product.findOneAndUpdate(
      { _id: bidding.productId }, 
      {$inc: {'currentPrice': bidding.bidAmount }}
    )

    return {
      _id: bidding._id,
      userId: bidding.userId,
      productId: bidding.productId,
      bidAmount: bidding.bidAmount,
      createdAt: bidding.createdAt,
    };
  }

  //List biddings for a product
  async list(productId) {
    const biddings = await this.Bidding.find({ productId }).sort({createdAt: 'desc'});
    return biddings;
  }

  //Get highest bid for a product
  async highestBid(productId) {
    const bid = await this.Bidding.findOne({ productId }).sort('-bidAmount');
    return bid;
  }

  //Purge records
  async purge() {
    await this.Bidding.deleteMany({});
  }
};
