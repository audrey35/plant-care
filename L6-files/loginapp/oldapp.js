const express = require('express')
const app = express()
const port = 3000

var my_handler = function(req, res) {
	res.send('This works too,')
}

//app.get('/', my_handler)

var secret_check = function(req, res, next) {
	// Some logic for checking access to secret resource
	// eventually fails, user isn't allowed
	next()
}

var error = function(req, res) {
	res.send('Access denied.')
}

//app.get('/', secret_check, error)

app.get('/', (req, res) => {
	console.log('Someone made a request from: ' 
		+ req.connection.remoteAddress)
  	res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://10.255.252.14:${port}`)
})
