path = require('path');
const express = require('express');

const app = express();

app.use(express.static('L4-files'));

app.listen(process.env.PORT || 3000, function() {
	console.log('App started on port 3000');
});
