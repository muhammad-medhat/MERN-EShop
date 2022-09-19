import Express from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  payOrder,
  deliverOrder
} from "../controllers/orderController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.route("/")
    .post(protect, addOrderItems)
    .get(protect, admin, getAllOrders)
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, payOrder);
router.route("/:id/deliver").put(protect, admin, deliverOrder);

export default router;
