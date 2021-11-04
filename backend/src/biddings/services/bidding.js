
const config = require('../../config');

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

    return {
      userId: bidding.userId,
      bidAmount: bidding.bidAmount,
    };
  }

  //List biddings for a product
  async list(productId) {
    const biddings = await this.Bidding.find({ productId });
    return biddings;
  }
};
