import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res
    .status(200)
    .json(new ApiResponse(200, products, 'Products fetched successfully'));
});

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError(404, 'Resource not found'));
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, 'Product fetched successfully'));
});

export { getProducts, getProductById };
