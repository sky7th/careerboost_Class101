const express = require('express');
const app = express();
const config = require('config');

require('./driver/db')();
require('./driver/routes')(app);

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

module.exports = server;