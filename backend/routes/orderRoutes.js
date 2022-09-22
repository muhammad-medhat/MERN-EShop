import Express from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  payOrder,
  deliverOrder,
  getUserOrders
} from "../controllers/orderController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.route("/")
    .post(protect, addOrderItems)
    .get(protect, admin, getAllOrders)
router.route("/my").get(protect, getUserOrders);
router.route("/:id/pay").put(protect, payOrder);
router.route("/:id/deliver").put(protect, admin, deliverOrder);
router.route("/:id").get(protect, getOrderById);


export default router;
