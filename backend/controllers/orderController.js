const Order = require("../models/Order");

/* CREATE ORDER */
exports.createOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    products: req.body.products,
    total: req.body.total,
    address: req.body.address,
  });

  res.json(order);
};

/* ADMIN GET OWN ORDERS */
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  const filtered = orders.filter((o) =>
    o.products.some((p) => p.admin === String(req.user.id)),
  );

  res.json(filtered);
};

/* MARK COMPLETED = DELETE ORDER */
exports.completeOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
