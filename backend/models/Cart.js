const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username: { type: String, required: true },
  products: [{ id: Number, quantity: Number }],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
