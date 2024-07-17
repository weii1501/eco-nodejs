"use strict";

const { Created, SuccessResponse } = require("../core/success.response");
// const ProductFatory = require("../services/product.service");
const ProductFatoryV2 = require("../services/product.service.xxx");

class ProductController {
  createProduct = async (req, res, next) => {
    // const newProduct = await ProductFatory.createProduct(
    //   req.body.product_type,
    //   {...req.body, product_shop: req.user.userId}
    // );
    // new Created({
    //   message: "Create product successfully!",
    //   metadata: newProduct,
    // }).send(res);

    const newProduct = await ProductFatoryV2.createProduct(
      req.body.product_type,
      { ...req.body, product_shop: req.user.userId }
    );
    new Created({
      message: "Create product successfully!",
      metadata: newProduct,
    }).send(res);
  };

  getAllDraftsForShop = async (req, res, next) => {
    const drafts = await ProductFatoryV2.findAllDraftsForShop({
        product_shop: req.user.userId,
        limit: 1,
        skip: 0
    });
    new SuccessResponse({
      message: "Get all drafts successfully!",
      metadata: drafts,
    }).send(res);
  };
}

module.exports = new ProductController();
