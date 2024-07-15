const { BadRequestError } = require("../core/error.response");
const {
  product,
  clothing,
  electronics,
  electronic,
} = require("../models/product.model");

class ProductFatory {
  static async createProduct(type, payload) {
    switch (type) {
      case "Clothing":
        return new Clothing(payload).createProduct();
      case "Electronics":
        return new Electronics(payload).createProduct();
      default:
        throw new BadRequestError("Invalid product type");
    }
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  async createProduct(_id) {
    return await product.create({...this, _id});
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) throw new BadRequestError("Create clothing failed");

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError("Create product failed");

    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic) throw new BadRequestError("Create electronic failed");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("Create product failed");

    return newProduct;
  }
}

module.exports = ProductFatory;
