const express = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

router.post("/toggle", favoriteController.toggleFavorite);

router.get("/:username", favoriteController.compareFavorites);

router.get("/allProducts/:username", favoriteController.getFavoriteProducts);

module.exports = router;
