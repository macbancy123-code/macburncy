import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, // Format like "₵700"
    rating: { type: Number, default: 0 },
    imageSrc: { type: String, required: true },
    category: { type: String, default: "Perfume" },
    notes: {
      top: [String],
      heart: [String],
      base: [String],
    },
    inStock: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
