import Express from "express";
import {
  userLogin,
  getUserProfile,
  createUser,
  deleteUser,updateUserProfile
} from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.route("/").post(createUser).delete(deleteUser);

/**
 * @route POST /api/users/login
 * @desc Login user
 * @access Public
 */
router.route("/login").post(userLogin);

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private
 */

router.route("/profile")
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile);

export default router;
