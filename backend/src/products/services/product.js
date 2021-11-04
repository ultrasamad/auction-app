
const config = require('../../config');

module.exports = class ProductService {
  constructor(Product) {
    this.Product = Product;
  }

  //Create new product
  async create(params) {
    if (await this.Product.findOne({ name: params.name }).exec()) {
      //TODO: Log Product already exists and continue
      console.log('Product already exists');
    } else {
      const  product = await this.Product.create({
        name: params.name,
        description: params.description,
        initialPrice: params.initialPrice,
        currentPrice: params.currentPrice,
        imageUrl: params.imageUrl,
        endTime: params.endTime
      });

      return {
        name: product.name,
        description: product.description,
      };
    }
  }

  //List products
  async list() {
    const products = await this.Product.find();
    return products;
  }

  //Fetch a product
  async fetch(productId) {
    const product = await this.Product.findById(productId).exec();
    return product;
  }
};
