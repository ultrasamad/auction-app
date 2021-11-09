const { Bidding } = require("../biddings/models");
const { BiddingService } = require("../biddings/services");
const { Product } = require("../products/models");
const { ProductService } = require('../products/services');

const biddingService = new BiddingService(Bidding);
const productService = new ProductService(Product);

module.exports = (io) => {
    const createBidding = async function (payload) {
        const socket = this;
        io.emit('bidding:created', payload);

        //Find product and check autobid status
        const { productId } = payload;
        const product = await productService.fetch(productId);
        if(product.autoBid === true) {
            console.log('AUTO BID BIDDING');
            const bidAmount = payload.bidAmount + 1;
            const params = {
                userId: 'AUTO BOT',
                productId: payload._id,
                bidAmount
            }
            //Create bid
            const bidding = await biddingService.create(params);
            //Emit event
            io.emit('bidding:created', bidding);
        }
    }
    
    return {
        createBidding,
    }
}