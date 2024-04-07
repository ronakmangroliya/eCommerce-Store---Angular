const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function checkout(req, res) {
  try {
    const { products, successUrl, cancelUrl } = req.body;

    const TAX_RATE = 0.13;
    const HANDLING_FEE = 2.99;
    const SHIPPING_FEE = 4.99;

    let totalPrice = 0;

    products.forEach((product) => {
      totalPrice += product.product.price * product.quantity;
    });

    const taxAmount = totalPrice * TAX_RATE;

    products.push({
      product: {
        title: "Tax",
        price: taxAmount,
      },
      quantity: 1,
    });

    products.push({
      product: {
        title: "Handling Fee",
        price: HANDLING_FEE,
      },
      quantity: 1,
    });

    products.push({
      product: {
        title: "Shipping",
        price: SHIPPING_FEE,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.product.title,
          },
          unit_amount: Math.round(product.product.price * 100),
        },
        quantity: product.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ sessionURL: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}

module.exports = {
  checkout,
};
