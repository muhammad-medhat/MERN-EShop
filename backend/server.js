import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);

const app = express();

dotenv.config();
connectDB();

//   app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json

//the __dirname is available if we are using commonjs
// since ES-modules is used in the system
// we can mimic it using the following line
const __dirname = path.resolve();

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
// app.post('/api/upload', (req, res)=>{
//   res.send('fffff')
// })
//making the uploads folder to be static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Deployment
if (process.env.NODE_ENV === "production") {
  const buildDir = path.join(__dirname, "frontend/build");
  // console.log('build folder',buildDir);
  app.use(express.static(buildDir));
  app.get("*", (req, res) => {
    const ind = path.resolve(__dirname, "frontend", "build", "index.html");
    // console.log('index file',ind);
    res.sendFile(ind);
  });
} else {
  // console.log('development');
  app.get("/", (req, res) => {
    res.send("API is Running...");
  });
  //morgan configuration
  app.use(morgan("dev"));
}
//......... End Deployment ...........................................

// Handle errors middleware
app.use(errorHandler, notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running on the ${process.env.NODE_ENV} mode on port ${port}`.blue
  );
});
