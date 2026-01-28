const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * Helper function to map cart items to frontend format
 */
const mapCartItems = (items) => {
  return items.map(item => {
    // Handle both populated and non-populated products
    const product = item.product && item.product._id 
      ? item.product 
      : (item.product ? { _id: item.product } : {});
    
    return {
      id: product._id ? product._id.toString() : item.product?.toString() || '',
      productId: product._id ? product._id.toString() : item.product?.toString() || '',
      title: product.title || product.productTitle || 'Product',
      productTitle: product.productTitle || product.title || 'Product',
      description: product.description || '',
      price: item.price || product.price || '$0.00',
      image: product.image || '',
      category: item.category || product.category || '',
      quantity: item.quantity || 1,
    };
  });
};

/**
 * Get user's cart
 */
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    
    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = new Cart({ user: req.userId, items: [] });
      await cart.save();
    }
    
    res.json({
      success: true,
      cart: {
        items: mapCartItems(cart.items),
      },
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add item to cart
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, category } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product == productId && item.category === category
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        category: category || product.category,
      });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({
      success: true,
      message: 'Item added to cart',
      cart: {
        items: cart.items.map(item => {
          const product = item.product._id ? item.product : { _id: item.product };
          return {
            id: product._id,
            productId: product._id,
            title: product.title || product.productTitle || 'Product',
            productTitle: product.productTitle || product.title || 'Product',
            description: product.description || '',
            price: item.price || product.price || '$0.00',
            image: product.image || '',
            category: item.category || product.category || '',
            quantity: item.quantity,
          };
        }),
      },
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update cart item quantity
 */
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, category } = req.body;
    
    if (quantity <= 0) {
      return exports.removeFromCart(req, res);
    }
    
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product == productId && item.category === category
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    
    res.json({
      success: true,
      message: 'Cart updated',
      cart: {
        items: mapCartItems(cart.items),
      },
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Remove item from cart
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId, category } = req.body;
    
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => !(item.product.toString() === productId && item.category === category)
    );
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: {
        items: mapCartItems(cart.items),
      },
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Clear cart
 */
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({
      success: true,
      message: 'Cart cleared',
      cart: { items: [] },
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Merge guest cart with user cart (on login)
 */
exports.mergeCart = async (req, res) => {
  try {
    const { guestCartItems } = req.body; // Array of items from localStorage
    
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }
    
    // Merge guest cart items with existing cart
    for (const guestItem of guestCartItems || []) {
      const productId = guestItem.id || guestItem.productId;
      const category = guestItem.category;
      const quantity = guestItem.quantity || 1;
      
      // Verify product exists
      const product = await Product.findById(productId);
      if (!product) continue;
      
      // Check if item already exists
      const existingItemIndex = cart.items.findIndex(
        item => item.product == productId && item.category === category
      );
      
      if (existingItemIndex > -1) {
        // Merge quantities (add guest quantity to existing)
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
          category,
        });
      }
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({
      success: true,
      message: 'Cart merged successfully',
      cart: {
        items: mapCartItems(cart.items),
      },
    });
  } catch (error) {
    console.error('Merge cart error:', error);
    res.status(500).json({ error: error.message });
  }
};
