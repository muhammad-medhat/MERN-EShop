import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  //Mongodb Search
  const keyword = req.query.keyword?{
    name: {
      $regex: req.query.keyword, 
      $options: 'i'
    }
  } :  {}
  // const products = await Product.find({...keyword}, {_id:1, name:1});
  const products = await Product.find({...keyword});
  return res.json(products);
});
/**
 * @route GET /api/products/:id
 * @desc Get product by id
 * @access Public
 * @param {string} id - product id
 */

export const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  // console.log(`product: ${product}`.green)
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  } else {
    return res.json(product);
  }
});

/**
 * @route POST /api/products
 * @desc Create new product
 * @access Public
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const productExist = await Product.findOne({ name });
  if (productExist) {
    res.status(400);
    throw new Error("Product already exists");
  } else {
    const product = await Product.create({ ...req.body, user: req.user.id });
    res.status(201).json({
      ...product,
    });
  }
});

export const initProduct = asyncHandler(async (req, res) => {
  const data = {
    name: "Temp name",
    price: 0.0,
    description: "...",
    category: "...",
    brand: "...",
    image: "images/sample.jpg",
  };

  const product = await Product.create({ ...data, user: req.user.id });
  res.status(201).json({
    ...product._doc,
  });
});

/**
 * @route DELETE /api/products/:id
 * @desc delete product by id
 * @access Private/admin
 */
export const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // console.log(`product: ${product}`.green)
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  } else {
    // console.log(product.user);
    console.log(product.user.id);
    product.remove();
    return res.json(product);
  }
});
/**
 * @route PUT /api/products/:id
 * @desc update product by id
 * @access Private/admin
 */
export const updateProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, countInStock, category, brand } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    Object.assign(product, req.body);
    product.save();
    return res.json(product);
  }
});

/**
 * @route POST /api/products/:id/reviews
 * @desc Add review for a product
 * @access Private/user
 */
export const addProductReview = asyncHandler(async (req, res) => {
  console.log("addProductReview");
  const { id: pid } = req.params;
  const { title, content, rating } = req.body;
  const product = await Product.findById(pid);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    if (
      product.reviews.find((r) => r.user.toString() == req.user.id.toString())
    ) {
      res.status(400).json({
        message: "you reviewed this product!!",
      });
    } else {
      const rev = { title, content, rating, user: req.user.id };
      product.reviews.push(rev);
      product.save();
      return res.json(product);
    }
  }
});
