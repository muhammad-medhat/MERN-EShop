import path from 'path'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

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
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
//making the uploads folder to be static

//the __dirname is available if we are using commonjs
// since ES-modules is used in the system
// we can mimic it using the following line
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Handle errors middleware
app.use(errorHandler, notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running on the ${process.env.NODE_ENV} mode on port ${port}`
      .blue
  );
});
