var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

// create a new instance of an express app
var app = express()

var admin = require("firebase-admin");

var serviceAccount = require("./mathscience-80673-firebase-adminsdk-e8a4d-d5eaf45430.json");
var firebaseAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://mathscience-80673.firebaseio.com"
});

app.set('view engine', 'ejs') //behind the scenes, requires ejs
// allows us to put css and images and stuff inside views folder
app.use(express.static('views'))
app.set('views', __dirname + '/views')


// tell app where to find views folder
app.set('views', __dirname + '/views')

app.get('/', function(request, response) {
	response.render('home.ejs')
})


var port = process.env.PORT

app.listen(port, function() {
	console.log(`App running on ${port} hamsters.`)
})