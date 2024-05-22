const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 2, maxlength: 30, unique: true},
	password: {type: String, required: true, minlength: 8, maxlength: 1024},
	}, 
	{
		timestamps: true,
	}
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
