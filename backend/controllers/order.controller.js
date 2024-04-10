import asyncHandler from '../utils/asyncHandler.js';
import Order from '../models/order.model.js';

//@desc     create new order
//@route    POST /api/orders
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log(shippingAddress);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//@desc     get logged in user orders
//@route    POST /api/orders/myorders
//@access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const myorders = await Order.find({ user: req.user._id });
  res.status(200).json(myorders);
});

//@desc     get order by id
//@route    POST /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc     update order to paid
//@route    PUT /api/orders/:id/pay
//@access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();

    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order doesn't exist");
  }
});

//@desc     update order to delivered
//@route    PUT /api/orders/:id/deliver
//@access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('get all order');
});

//@desc     Get all order
//@route    POST /api/orders
//@access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('add order items');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
