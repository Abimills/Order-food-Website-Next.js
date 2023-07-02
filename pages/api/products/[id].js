import dbConnect from "@/lib/mongodbConnect";
import Products from "@/models/Products";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();
  if (method === "GET") {
    try {
      const product = await Products.findById(id);
      if (!product) {
        res.status(404).json({ success: false, message: "products not found" });
      } else {
        res.status(200).json({
          success: true,

          message: "successfully fetched",
          product,
        });
      }
    } catch (error) {
      res.status(500).json({
        error,
        message:
          "can not fetch product, something went wrong please try again ",
      });
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authorized!");
    }
    try {
      const deletedProduct = await Products.findByIdAndDelete(id);
      if (!deletedProduct) {
        res.status(404).json({
          success: false,
          message: "product already deleted or not found",
        });
      }
      res
        .status(201)
        .json({ success: true, message: " You successfully deleted a pizza" });
    } catch (error) {
      res.status(500).json({
        error,
        message:
          "can not delete products,something went wrong please try again ",
      });
    }
  }
}
