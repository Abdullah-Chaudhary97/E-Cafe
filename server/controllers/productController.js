const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID or slug
exports.getProductById = async (req, res) => {
  try {
    const identifier = req.params.id;
    
    // Try to find by slug first (format: productname-123)
    let product = await Product.findOne({ slug: identifier });
    
    // If not found by slug, try by numeric ID
    if (!product) {
      const numericId = parseInt(identifier);
      if (!isNaN(numericId)) {
        product = await Product.findById(numericId);
      }
    }
    
    // If still not found, try by ID directly (for backward compatibility)
    if (!product) {
      product = await Product.findById(identifier);
    }
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    // Use raw MongoDB to ensure we get all fields including slugs
    const mongoose = require('mongoose');
    const db = mongoose.connection.db;
    if (db) {
      const productsCollection = db.collection('products');
      const products = await productsCollection.find({ category }).toArray();
      return res.json(products);
    }
    // Fallback to Mongoose if raw access fails
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { productTitle: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
