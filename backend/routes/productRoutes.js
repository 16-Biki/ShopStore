const router = require("express").Router();
const upload = require("../utils/upload");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", auth, admin, upload.single("image"), createProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;
