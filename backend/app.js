const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const cors = require("cors");

dotenv.config();

mongoose.set('strictQuery', false);

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Construct MongoDB connection URI
const MONGO_USERNAME = encodeURIComponent(process.env.MONGO_USERNAME);
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority`;

// MongoDB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log(`Connected to MongoDB database: ${process.env.MONGO_DBNAME}`);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/stripe", checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
