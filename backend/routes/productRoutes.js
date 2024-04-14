const express = require("express");
const productController = require("../controllers/productController");
const middleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

router.post("/add", productController.addToCart);

router.get("/:username", productController.getProductsInCart);

router.put("/updateQuantity", productController.updateCartProductQuantity);

router.delete(
  "/removeProduct/:username/:productId",
  productController.removeProductFromCart
);

module.exports = router;
