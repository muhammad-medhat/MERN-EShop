import Express from "express";
import {
  addOrderItems,
  getOrderById,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);

export default router;
