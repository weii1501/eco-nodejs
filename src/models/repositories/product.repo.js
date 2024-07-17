"use strict";

const {
  product,
  electronic,
  clothing,
  furniture,
} = require("../product.model");
const { Types } = require("mongoose");

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate("product_shop", "name email -_id")
    .sort({ updateAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean()
    .exec();
};

const publishProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await product.findOne({
    product_shop: Types.ObjectId(product_shop),
    _id: Types.ObjectId(product_id),
  });

  if (!foundShop) return null;

  foundShop.isPublished = true;
  foundShop.isDraft = false;

  const { modifiedCount } = await foundShop.updateOne(foundShop);
  return modifiedCount
};

module.exports = {
  findAllDraftsForShop,
  publishProductByShop,
};
