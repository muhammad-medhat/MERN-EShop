import asyncHandler from 'express-async-handler'
import Product  from "../models/productModel.js";

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
export const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    return res.json(products);
})
/**
 * @route GET /api/products/:id
 * @desc Get product by id
 * @access Public
 * @param {string} id - product id
 */

export const getProductById = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id)
    // console.log(`product: ${product}`.green)
    if(!product) {
        return res.status(404).json({msg: 'Product not found'})
    } else {
        return res.json(product);
    }
})