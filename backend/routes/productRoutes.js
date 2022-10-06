import Express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
  initProduct,
  addProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = Express.Router();

router.route("/")
      .get(getProducts)
      .post(protect, admin, initProduct);

router.get('/top/:limit', getTopProducts)
router.get('/top/', getTopProducts)

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, deleteProductById)
  .put(protect, updateProductById);

router.route("/:id/reviews").post(protect, addProductReview);

export default router;
