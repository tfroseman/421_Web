var compression = require('compression');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var schedule = require('./schedule');

//setup the root path
var root = __dirname;

var app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Used to allow express to find the js file
app.use(express.static('js'));
app.use(express.static('css'));
app.use(express.static('img'));

// Set some express variables
app.set("jsonp callback", true); //Allow for jsonp responses
app.set('view engine', 'jade'); // Using jade templates


// Return default index
app.get('/', function (req, res) {
    res.render('About/home');
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
            res.render('EvalJSONP/index');
        } else {
            res.render('EvalJSONP/side');
        }
    });

app.route('/chat').get(function(req,res){
    res.render('CloudChat/index');
});

app.get('/schedule',function(req,res){
    res.render('Schedule/index');
});

app.get('/schedule/421',function(req,res){
    res.json(schedule);
});

app.get('/relax', function (req, res) {
    res.render('CanvasAnimation/index');
});

app.get('/notes', function (req, res) {
    res.render('LectureNotes/index');
});

app.get('/services', function (req, res) {
    res.render('Services/index');
});

app.get('/roster', function (req, res) {
    res.redirect("http://localhost:8080/roster.jsp");
});



app.listen(8081, function () {
    console.log('Server running at http://127.0.0.1:8081/');
});