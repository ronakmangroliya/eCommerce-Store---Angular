const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

async function toggleFavorite(req, res) {
  try {
    const { username, productId } = req.body;

    // Check if the user has already favorited any products
    let existingFavorite = await Favorite.findOne({ username });

    if (existingFavorite) {
      // If the user has favorites, check if the product is already in the list
      if (existingFavorite.products.includes(productId)) {
        // If the product is already favorited, remove it from favorites
        existingFavorite.products = existingFavorite.products.filter(
          (id) => id !== productId
        );
        await existingFavorite.save();
        return res.status(200).json({
          status: "success",
          message: "Product removed from favorites",
        });
      } else {
        // If the product is not in the list, add it to favorites
        existingFavorite.products.push(productId);
        await existingFavorite.save();
        return res.status(200).json({
          status: "success",
          message: "Product added to favorites",
        });
      }
    } else {
      // If the user does not have any favorites yet, create a new favorite list
      const newFavorite = new Favorite({ username, products: [productId] });
      await newFavorite.save();
      return res.status(200).json({
        status: "success",
        message: "Product added to favorites",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}


async function compareFavorites(req, res) {
  try {
    const { username } = req.params;

    // Find the favorite document for the specified user
    const favorite = await Favorite.findOne({ username });

    if (!favorite) {
      return res.status(404).json({
        status: "failed",
        message: "No favorite products found for the user",
      });
    }

    // Return the list of favorite product IDs
    return res.status(200).json({
      status: "success",
      data: favorite.products,
    });
  } catch (error) {
    console.error("Error retrieving favorite products:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function getFavoriteProducts(req, res) {
  try {
    const { username } = req.params;

    // Find the favorite document for the specified user
    const favorite = await Favorite.findOne({ username });

    if (!favorite) {
      return res.status(404).json({
        status: "failed",
        message: "No favorite products found for the user",
      });
    }

    // Retrieve details of the favorite products
    const favoriteProducts = await Product.find({ id: { $in: favorite.products } });

    return res.status(200).json({
      status: "success",
      data: favoriteProducts,
    });
  } catch (error) {
    console.error("Error retrieving favorite products:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

module.exports = {
  toggleFavorite,
  getFavoriteProducts,
  compareFavorites,
};
