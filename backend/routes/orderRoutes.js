const router = require("express").Router();

const {
  createOrder,
  getAllOrders,
  completeOrder,
} = require("../controllers/orderController");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.post("/", auth, createOrder);
router.get("/", auth, admin, getAllOrders);

// 🔥 ONE BUTTON → DELETE
router.put("/complete/:id", auth, admin, completeOrder);

module.exports = router;
