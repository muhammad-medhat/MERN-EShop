import Express from 'express'
import { addOrderItems } from '../controllers/OrdersController.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();



router.route('/').post(protect, addOrderItems)


export default router