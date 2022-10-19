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

export const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate("user", "email name");
  // console.log(`Order: ${Order}`.green)
  if (!order) {
    return res.status(404).json({ msg: "Order not found" });
  } else {
    return res.json(order);
  }
});

/**
 * @route PUT /api/Orders/:id/pay
 * @desc Update Order Payment Status
 * @access Private
 */
export const payOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (order) {
    order.isPaid= true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    order.save();

    return res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @route GET /api/Orders
 * @desc get all orders
 * @access Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  if (!orders) {
    res.status(400);
    throw new Error("Error");
  } else {
    return res.json(orders);
  }
});

/**
 * @route PUT /api/Orders/:id/deliver
 * @desc Update Order delivery Status
 * @access Private/Admin
 */
export const deliverOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = order.save();

    return res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateDeliverOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = order.save();

    return res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @route GET /api/orders/my
 * @desc Get user orders
 * @access Private/user
 */
 export const getUserOrders = asyncHandler(async (req, res) => {
  console.log("get user orders");
  // console.log(req.user);
  const orders = await Order.find({user: req.user.id})
  if(orders){
      res.status(200).json(orders)

  } else {
    res.status(400)
    throw new Error('No Orders')
  }
});