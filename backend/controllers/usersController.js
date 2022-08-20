import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateTokenForUser } from "../utils/auth.js";

/**
 * @route POST /api/users
 * @desc Create new users
 * @access Public
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400)
      throw new Error("User already exists");
    }   else {
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
 * @access Private
 */

export const getUserProfile = asyncHandler(async (req, res) => {
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
 * @access Private
 */

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user.id)
  user.name = name || user.name;
  user.email = email || user.email; 
  user.password = password || user.password
  const updatedUser = await user.save();
  if (!updatedUser) {
    throw new Error("User not found");
  } else {
    return res.json({
      ...displayFriendly(updatedUser),
      token: generateTokenForUser(updatedUser.id),
    });  }
});

/**
 * @route POST /api/users/login
 * @desc Login user
 * @access Public
 */
export const userLogin = asyncHandler(async (req, res) => {
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
const displayFriendly = (user) =>{
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }
}





/******
 * not used yet
 */
/**
 * @route DELETE /api/users
 * @desc Delete user
 * it is not supposed to be public
 * just for testing purposes
 * @access Public
 */
 export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
      res.status(404)
      throw new Error("User not found");
  } else {
      res.status(200).json({
          message: "User deleted successfully",
      });
  }
})
/**
* @route GET /api/users
* @desc Get all users
* @access Private Admin
*/
export const getUsers = asyncHandler(async (req, res) => {
const users = await User.find({});
return res.json(users);
});
/**
* @route GET /api/users/:id
* @desc Get user by id
* @access Private
* @param {string} id - user id
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