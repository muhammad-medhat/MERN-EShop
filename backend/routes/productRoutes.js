import Express from 'express'
import { getProducts, getProductById } from '../controllers/productsController.js';
const router = Express.Router();


/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
router.route('/').get(getProducts)
// router.get('/', getProducts)

/**
 * @route GET /api/products/:id
 * @desc Get product by id
 * @access Public
 * @param {string} id - product id
 */

// router.get('/:id', getProductById)
router.route('/:id').get(getProductById)

export default router