import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateTokenForUser } from "../utils/auth.js";

/**
 * @route DELETE /api/users/:id
 * @desc Delete user
 * @access Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json({
      user,
      message: "User deleted successfully",
    });
  }
});

/**
 * @route POST /api/users
 * @desc Create new users
 * @access Public
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw Error("User already exists");
  } else {
    const user = await User.create({ name, email, password });
    const token = generateTokenForUser(user);
    res.status(201).json({
      ...displayFriendly(user),
      token,
    });
  }
});

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private/user
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  console.log("get user profile");
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    throw new Error("User not found");
  } else {
    return res.json({
      ...displayFriendly(user),
      token: generateTokenForUser(user.id),
    });
  }
});

/**
 * @route PUT /api/users/profile
 * @desc update user profile
 * @access Private/user
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("updateUserProfile");
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findById(req.user.id);
  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  user.isAdmin = isAdmin || user.isAdmin;
  const updatedUser = await user.save();
  if (!updatedUser) {
    throw new Error("User not found");
  } else {
    return res.json({
      ...displayFriendly(updatedUser),
      token: generateTokenForUser(updatedUser.id),
    });
  }
});

/**
 * @route PUT /api/users/:id
 * @desc update user by id
 * @access Private/admin
 */
export const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  // console.log(`user: ${user}`.green)

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    user.save();
    return res.json(user);
  }
});

/**
 * @route POST /api/users/login
 * @desc Login user
 * @access Public
 */
export const userLogin = asyncHandler(async (req, res) => {
  console.log("userLogin");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      return res.json({
        ...displayFriendly(user),
        token: generateTokenForUser(user.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  }
});

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Private/Admin
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

/**
 * @route GET /api/users/:id
 * @desc Get user by id
 * @access Private/Admin
 */

export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  // console.log(`user: ${user}`.green)
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  } else {
    return res.json(user);
  }
});

const displayFriendly = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};
