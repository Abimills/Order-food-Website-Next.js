import dbConnect from "@/lib/mongodbConnect";
import Order from "@/models/Order";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res
        .status(200)
        .json({ success: true, message: "successfully fetched order", order });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      res
        .status(200)
        .json({ success: true, message: "successfully changed order", order });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "DELETE") {
  }
}
