"use strict";

const { Created, SuccessResponse } = require("../core/success.response");
const ProductFatory = require("../services/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    const newProduct = await ProductFatory.createProduct(
      req.body.product_type,
      {...req.body, product_shop: req.user.userId}
    );
    new Created({
      message: "Create product successfully!",
      metadata: newProduct,
    }).send(res);
  };
}

module.exports = new ProductController();
