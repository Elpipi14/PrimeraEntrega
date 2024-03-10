import mongoose from "mongoose";

const productsSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: { type: Boolean, required: true },
    code: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
  });

  export const ProductsModel = mongoose.model("products", productsSchema);