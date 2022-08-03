const express = require('express');
const products = require('./data/products.js');

const app = express();
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
    console.log(`Server is running on port ${port}`);
    }
);
