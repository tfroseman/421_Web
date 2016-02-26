var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

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


// Used to allow express to find the js file
app.use(express.static('js'));
app.use(express.static('css'));

// Set some express variables
app.set("jsonp callback", true); //Allow for jsonp responses
app.set('view engine', 'jade'); // Using jade templates


// Return default index
app.get('/', function (req, res) {
    fs.readFile('home.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});

// About.html page controller
app.get('/about.html', function (req, res) {
    fs.readFile('about.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});

// Generic side controller
app.get('/side.html', function (req, res) {
    fs.readFile('side.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quiz Routes with Email
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route('/EvalTool/quiz')
    .post(function (req, res) {
        console.log("Post request");
        var user_answers = req.body;
        var correctanswers = [0, 1, 3, 2, 2, 2, 3, 1, 1, 3];
        var score = 0;
        console.log(req.body);
        console.log(user_answers.answers);

        for (var i = 0; i < correctanswers.length; i++) {
            if (user_answers.answers[i] == correctanswers[i]) {
                score = score + 1;
            }
        }

        //res.render('EvalTool/email', {user_score : score});
        res.json({"score": score});
    });

//Send values back over a post request in the body
app.route('/EvalTool/quiz/:question?')
    .get(function (req, res) {
        /*var options = {
         root: 'EvalTool/',
         dotfiles: 'deny',
         headers: {
         'x-timestamp': Date.now(),
         'x-sent': true
         }
         };

         var fileName = req.params.question;
         res.sendFile(fileName + '.html', options, function (err) {
         if (err) {
         console.log(err);
         res.status(err.status).end();
         }
         else {
         console.log('Sent:', fileName + '.html');
         }
         });*/
        if (req.params.question == undefined) {
            res.render('EvalTool/question1');
        } else {
            res.render('EvalTool/' + req.params.question);
        }

    });

app.route('/EvalTool/email/:score?')
    .get(function (req, res) {
        console.log(req.params.score);
        res.render('email', {"user_score": req.params.score});
    })
    .post(function (req, res) {

        console.log(req.body);

        //Use unsecureda mail creation on default port 25
        var transporter = nodemailer.createTransport();
        transporter.sendMail({
            from: req.body.fname,
            to: req.body.tname,
            subject: req.body.subject,
            text: req.body.score
        });
    });

//Get the main page and side for quiz
app.route('/EvalTool/:side?')
    .get(function (req, res) {
        if (req.params.side == undefined) {
            res.render('EvalTool/index');
        } else {
            res.render('EvalTool/side');
        }
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