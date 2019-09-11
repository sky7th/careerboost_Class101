const mongoose = require('mongoose');
const sendMail = require('../utils/sendEmail');
const Joi = require('@hapi/joi');

const resetPassword = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        ref: 'User'
    },
    hash: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
        index: {
            expires: 86400
        }
    }
});

resetPassword.methods.sendHashEmail = async function () {
    const serverUrl = process.env.URL;
    const resetURL = `${serverUrl}/login/resetPassword/${this.email}/${
		this.hash
	}`;

    const htmlEmail = `<h1><a href="${resetURL}">Click Here</a> to Reset your Password</h1>
	<div>Or copy and paste this into your web browser ${resetURL}</div>`;

    try {
        await sendMail(this.email, 'Reset Password', htmlEmail);
    } catch (error) {
        console.log(error);
    }
};

const ResetPassword = mongoose.model('ResetPassword', resetPassword);

function validateResetPassword(user) {
    const schema = {
        email: Joi.string()
            .required()
            .email(),
        hash: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

exports.ResetPassword = ResetPassword;
exports.validateResetPassword = validateResetPassword;