"use strict";

const express = require("express");
const apiRouterproductRouter = express.Router();
const ProductController = require("../../controllers/product.controller");
const MessageHandler = require("../../utils/MessageHandler");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication_v2 } = require("../../auth/authUtils");
const productRouter = express.Router();


productRouter.use(authentication_v2);

productRouter.post("/", asyncHandler(ProductController.createProduct));

// QUERY
productRouter.get("/drafts/all", asyncHandler(ProductController.getAllDraftsForShop));



module.exports = productRouter;
