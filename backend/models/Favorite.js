const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  products: [{ type: Number }],
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
