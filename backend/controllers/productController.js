const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  if (!req.file) return res.status(400).json("No image");
 /*
    Convert uploaded image buffer to Base64 string
    This allows storing image directly inside MongoDB
  */
  const base64 =
    "data:" +
    req.file.mimetype +
    ";base64," +
    req.file.buffer.toString("base64");

  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: base64,
    admin: req.user.id,
  });

  res.json(product);
};

exports.getProducts = async (req, res) => {
  res.json(await Product.find());
};

exports.deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({
    _id: req.params.id,
    admin: req.user.id,
  });

  res.json({ msg: "Deleted" });
};

exports.updateProduct = async (req, res) => {
  await Product.findOneAndUpdate(
    { _id: req.params.id, admin: req.user.id },
    { price: req.body.price },
  );

  res.json({ msg: "Updated" });
};
