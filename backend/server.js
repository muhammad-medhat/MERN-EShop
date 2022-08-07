import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import products from './data/products.js'

const app = express();
dotenv.config();
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    exposedHeaders: ["Content-Range", 'X-Total-Count']
  };
  
//   app.use(cors(corsOptions));

//routes
app.get('/api/products', (req, res) => {
    return res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product._id === id);
    return res.json(product);
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on the ${process.env.NODE_ENV} mode on port ${port}`);
    }
);
