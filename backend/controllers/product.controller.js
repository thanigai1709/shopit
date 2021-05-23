const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
// create new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
	const newProduct = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product: newProduct,
	});
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
	const resPerpage = 4;
	const productCount = await Product.countDocuments();
	const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerpage);
	const products = await apiFeatures.query;
	res.status(200).json({
		success: true,
		count: products.length,
		productCount,
		products,
	});
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	res.status(200).json({
		success: true,
		product,
	});
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
		product: updatedProduct,
	});
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	await product.remove();
	res.status(200).json({
		success: true,
		message: "Product is deleted",
	});
});
