import Express from "express";
import {
  addProductReview, 
  createProduct, 
  deleteProductById, 
  getProductById, 
  getProducts, 
  getTopProducts, 
  initProduct, 
  updateProductById
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = Express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, admin, createProduct);

router.get("/top/:limit", getTopProducts);
router.get("/top/", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, deleteProductById)
  .put(protect, updateProductById);

router.route("/:id/reviews").post(protect, addProductReview);

export default router;
