import Express from "express";
import {
  userLogin,
  getUserProfile,
  createUser,
  deleteUser,updateUserProfile, getUsers, getUserById, updateUserById
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = Express.Router();
//this route must be defined before get by id
router.route("/profile")
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile);

router.route("/")
        .get(protect, admin, getUsers)
        .post( createUser) //unprotected route to allow register

router.route('/:id')
        .get(protect, admin, getUserById)
        .delete(protect, admin, deleteUser)
        .put(protect, admin, updateUserById)

/**
 * @route POST /api/users/login
 * @desc Login user
 * @access Public
 */
router.route("/login").post(userLogin);






export default router;
