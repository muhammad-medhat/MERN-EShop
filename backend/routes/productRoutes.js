import Express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
  initProduct,
  addProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = Express.Router();

router.route("/").get(getProducts).post(protect, admin, initProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, deleteProductById)
  .put(protect, updateProductById);

router.route("/:id/reviews").post(protect, addProductReview);

export default router;
