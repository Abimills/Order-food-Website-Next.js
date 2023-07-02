import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, "Please provide a customer name"],
    maxLength: [60, "name can not be more than 60 characters"],
  },
  address: {
    type: String,
    required: [true, "Please provide a customer address"],
    maxLength: [100, "address can not be more than 60 characters"],
  },
  total: {
    type: Number,
    required: [true, "Your Total is not defined"],
  },
  status: {
    type: Number,
    default: 0,
  },
  method: {
    type: Number,
    required: [true, "Please provide a payment method"],
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
