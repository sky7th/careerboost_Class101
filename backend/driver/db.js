require('dotenv').config()

const mongoose = require('mongoose');

module.exports = async function() {
	const mongoosOptions = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	};
	const db = process.env.DB;

	try {
		await mongoose.connect(db, mongoosOptions);
		console.log(`DB Connected to ${db}`);
	} catch (error) {
		console.error('Could not connect to Mongose DB', error);
	}
};