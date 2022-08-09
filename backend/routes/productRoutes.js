import Express from 'express'
import asyncHandler from 'express-async-handler'
const router = Express.Router();
import Product  from "../models/productModel.js";



router.get('/', asyncHandler(async(req, res) => {
    const products = await Product.find({})
    return res.json(products);
}))

router.get('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id)
    // console.log(`product: ${product}`.green)
    if(!product) {
        return res.status(404).json({msg: 'Product not found'})
    } else {
        return res.json(product);
    }

}))

export default router