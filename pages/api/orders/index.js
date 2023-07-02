import dbConnect from "@/lib/mongodbConnect";
import Order from "@/models/Order";

export default async function handler(req,res) {
  const { method } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const orders = await Order.find();
      res
        .status(200)
        .json({ success: true, message: "successfully created order", orders });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong while in order backend please try again",
      });
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "successfully created order", order });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong while in order backend please try again",
      });
    }
  }
}
