import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a name for your product"],
      maxLength: [60, "name can not be more than 60 characters"],
    },
    desc: {
      type: String,
      required: [true, "Please provide description for your product"],
      maxLength: [200, "name can not be more than 200 characters"],
    },
    img: {
      type: String,
      required: [true, "Please provide an image"],
    },
    prices: {
      type: [Number],
      required: [true, "Please provide at least one price for your product"],
    },
    extraOptions: {
      type: [
        {
          text: {
            type: String,
            required: [true, "please provide a name for your extras"],
          },
          price: {
            type: String,
            required: [true, "please provide a price for your extras"],
          },
        },
      ],
      required: [true, "Please provide a name for your product"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
