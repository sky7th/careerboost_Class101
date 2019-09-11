const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
    },
    name: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	imgURL: {
		type: String,
		default: 'https://i.imgur.com/dGo8DOk.png'
	},
	verified: {
		type: Boolean,
		default: false
	}
});

userSchema.methods.generateAuthToken = function() {
	const { id, name, email, verified, phone, imgURL } = this;
	const token = jwt.sign(
		{
			_id: id,
			name,
			verified,
			email,
			phone,
			imgURL
		},
		process.env.JWT_SECRET
    );
	return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().required(),
		email: Joi.string()
			.required()
			.email(),
		phone: Joi.string(),
		imgURL: Joi.string(),
		password: Joi.string().required()
	};
	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;