const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
		maxLength: [30, "Your name cannot exceed 30 characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		validate: [validator.isEmail, "please enter a valid email address"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [6, "Your password must be longer than 6 characters"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPassword: String,
	resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
