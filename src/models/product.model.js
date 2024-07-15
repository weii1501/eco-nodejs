const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    product_attributes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
// module.exports = mongoose.model(DOCUMENT_NAME, productSchema);

const clothingSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
  },
  {
    collection: "clothes",
    timestamps: true,
  }
);

const electronicSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
  },
  {
    collection: "electronics",
    timestamps: true,
  }
);

const furnitureSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
  },
  {
    collection: "furnitures",
    timestamps: true,
  }
);

module.exports = {
  product: mongoose.model(DOCUMENT_NAME, productSchema),
  clothing: mongoose.model("Clothing", clothingSchema),
  electronic: mongoose.model("Electronics", electronicSchema),
  furniture: mongoose.model("Furnitures", furnitureSchema),
};
