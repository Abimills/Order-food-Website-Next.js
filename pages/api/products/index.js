import dbConnect from "@/lib/mongodbConnect";
import Products from "@/models/Products";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;
  dbConnect();
  if (method === "GET") {
    try {
      const products = await Products.find();
      if (!products) {
        res.status(404).json({ success: false, message: "products not found" });
      } else {
        res.status(200).json({
          success: true,
          count: products.length,
          message: "successfully fetched all products",
          products,
        });
      }
    } catch (error) {
      res.status(500).json({
        error,
        message:
          "can not get all products, something went wrong please try again ",
      });
    }
  }
  if (method === "POST") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    const newProduct = await Products.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "you created a pizza", newProduct });
    try {
    } catch (error) {
      res.status(500).json({
        error,
        message:
          "can not create products,something went wrong please try again ",
      });
    }
  }
}
