const mongoose = require('mongoose');
const sendMail = require('../utils/sendEmail');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const verifySchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
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

verifySchema.methods.sendHashEmail = async function (email) {
    const proxyUrl = process.env.SERVER_URL;
    const hashString = `${proxyUrl}/users/${this._userId}/verify/${
		this.hash
	}`;

    const htmlEmail = `<h1>회원가입을 완료하기 위해서</h1><a href="${hashString}">여기를 클릭해주세요.</a>`;

    try {
        await sendMail(email, 'Verify Email', htmlEmail);
    } catch (error) {
        console.log(error);
    }
};

const Verify = mongoose.model('Verify', verifySchema);

function validateVerify(user) {
    const schema = {
        userId: Joi.objectId().required(),
        hash: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

exports.Verify = Verify;
exports.validateVerify = validateVerify;