import Express from "express";
import {
  addOrderItems,
  getOrderById,
  payOrder,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, payOrder);

export default router;
