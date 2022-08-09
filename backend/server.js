import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
// import products from './data/products.js'

import productRoutes from './routes/productRoutes.js'


const app = express();

dotenv.config();
connectDB();
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    exposedHeaders: ["Content-Range", 'X-Total-Count']
  };
  
//   app.use(cors(corsOptions));

app.use('/api/products', productRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on the ${process.env.NODE_ENV} mode on port ${port}`);
    }
);
