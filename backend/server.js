import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

dotenv.config();
connectDB();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//   app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json

/**
 * routes
 */

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Handle errors middleware
app.use(errorHandler, notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running on the ${process.env.NODE_ENV} mode on port ${port}`
  );
});
