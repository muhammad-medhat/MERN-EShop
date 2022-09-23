import Express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById, initProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = Express.Router();

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
router.route("/")
      .get(getProducts)
      .post(protect,admin, initProduct);

/**
 * @route GET /api/products/:id
 * @desc Get product by id
 * @access Public
 * @param {string} id - product id
 */

// router.get('/:id', getProductById)
router.route("/:id")
    .get(getProductById)
    .delete(protect,deleteProductById)
    .put(protect, updateProductById);

export default router;
