const Product = require("../models/Product");
const Cart = require("../models/Cart");

async function getAllProducts(req, res) {
  const products = await Product.find();
  return res.status(200).json({
    status: "success",
    data: products,
    message: "Products fetched successfully",
  });
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function addToCart(req, res) {
  try {
    const { username, productId, quantity } = req.body;

    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({ username, products: [] });
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    await cart.save();

    return res.status(200).json({
      status: "success",
      data: cart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function getProductsInCart(req, res) {
  try {
    const username = req.params.username;

    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "Cart not found for the user",
      });
    }

    const productDetails = [];

    for (const productItem of cart.products) {
      const product = await Product.findOne({ id: productItem.id });

      productDetails.push({
        product,
        quantity: productItem.quantity,
      });
    }

    return res.status(200).json({
      status: "success",
      data: productDetails,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function updateCartProductQuantity(req, res) {
  try {
    const { username, productId, quantity } = req.body;

    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "Cart not found for the user",
      });
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );

    if (!existingProduct) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found in the cart",
      });
    }

    existingProduct.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      status: "success",
      data: cart,
      message: "Product quantity updated successfully in the cart",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function removeProductFromCart(req, res) {
  try {
    const { username, productId } = req.params;

    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "Cart not found for the user",
      });
    }

    const productIdNumber = parseInt(productId);

    cart.products = cart.products.filter(
      (product) => product.id !== productIdNumber
    );

    await cart.save();

    return res.status(200).json({
      status: "success",
      data: cart,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addToCart,
  getProductsInCart,
  updateCartProductQuantity,
  removeProductFromCart,
};
