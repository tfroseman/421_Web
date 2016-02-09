var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var ChatServer = require('./CloudChat/ChatServer');
var syllabus = require('./Syllabus/syllabus');

//setup the root path
var root = __dirname;
ChatServer.gettool.root = root;
syllabus.gettool.root = root;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Used to allow express to find the js file
app.use(express.static('js'));
app.use(express.static('css'));

app.set("jsonp callback", true);

app.get('/', function (req, res) {
    fs.readFile('home.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});
app.get('/about.html', function (req, res) {
    fs.readFile('about.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});
app.get('/side.html', function (req, res) {
    fs.readFile('side.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});

/**app.get('/Syllabus/syllabus.html', function(req, res){
	fs.readFile('./Syllabus/syllabus.html', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		res.send(data);
	});
});*/


app.get('/ThreeRegion/*', threeregion);
function threeregion(req, res) {
    var fileName = root + req.path;
    res.sendFile(fileName, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', req.path);
        }
    });
}

app.get('/CloudChat/*', ChatServer.gettool);
app.get('/Syllabus/*', syllabus.gettool);


app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/');
});