const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter product name"],
		trim: true,
		maxLength: [200, "Product name cannot exceed 200 characters"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price"],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, "Please enter product description"],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Please select the product category"],
		enum: {
			values: ["Electronics", "Furniture", "Laptop", "Accessories", "Food", "Books", "Clothes", "Beauty/Health", "Fashion", "Sports"],
			message: "Please select correct category for product",
		},
	},
	seller: {
		type: String,
		required: [true, "Please enter product seller"],
	},
	stock: {
		type: Number,
		required: [true, "Please enter product stock"],
		maxLength: [10, "Product name cannot exceed 10 characters"],
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
