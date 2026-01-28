const Order = require('../models/Order');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.userId,
    });
    await order.save();
    await order.populate('items.product');
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.user._id !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const orders = await Order.find()
      .populate('items.product')
      .populate('user')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
