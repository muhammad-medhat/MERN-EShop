import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

/**
 * @route POST /api/Orders
 * @desc Create new Order
 * @access Private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
export const getOrderById = asyncHandler(async(req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id)
  // console.log(`Order: ${Order}`.green)
  if(!order) {
      return res.status(404).json({msg: 'Order not found'})
  } else {
      return res.json(order);
  }
})