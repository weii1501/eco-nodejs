const { BadRequestError } = require("../core/error.response");
const {
  product,
  clothing,
  electronics,
  electronic,
} = require("../models/product.model");
const { findAllDraftsForShop, publishProductByShop } = require("../models/repositories/product.repo");

class ProductFatory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    this.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = this.productRegistry[type];

    if (!productClass) throw new BadRequestError("Invalid product type");

    return new productClass(payload).createProduct();
  }

  static async findAllDraftsForShop({ product_shop, limit = 10, skip = 0 }) {
    // query
    const query = { product_shop, isDraft: true };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
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
    return await product.create({ ...this, _id });
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

class Furnitures extends Product {
  async createProduct() {
    const newFurniture = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newFurniture) throw new BadRequestError("Create electronic failed");

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError("Create product failed");

    return newProduct;
  }
}

ProductFatory.registerProductType("Clothing", Clothing);
ProductFatory.registerProductType("Electronics", Electronics);
ProductFatory.registerProductType("Furnitures", Furnitures);

module.exports = ProductFatory;
