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


//Used to allow express to find the js file
app.use(express.static('js'));
app.use(express.static('css'));

app.set("jsonp callback", true);
app.set('view engine', 'jade');


/**
 * Setting up routes: some return full html files. Others will handle requests better by not neededing full page loads. Some will return jade files
 */
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

app.route('/EvalTool/quiz')
    .get(function (req, res) {
        var options = {
            root: 'EvalTool/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        var fileName = 'question1.html';
        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('Sent:', fileName);
            }
        });

    })
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
app.route('/EvalTool/quiz/:question')
    .get(function (req, res) {
        var options = {
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
        });

    })
    .post(function (req, res) {
        var answer = req.body.answer;
        var current_question = req.body.current_question;
        console.log(answer);
        console.log(current_question);
        res.send("Thankyou");
    })
    .put(function (req, res) {

    });

//Send values over uri can be grabbed as seen bellow
app.route('/EvalTool/quiz/:quiz_id/:answer')
    .get(function (req, res) {
        //Not really needed
        res.send("Quiz");
    })
    .post(function (req, res) {
        //Grab the values when posted
        //console.log(req.params);
        //console.log(req.params.quiz_id);
        res.send('Thankyou');
    })
    .put(function (req, res) {
        //Again not needed
    });

app.route('/EvalTool/email/:score?')
    .get(function (req, res) {
        console.log(req.params.score);
        res.render('email', {"user_score": req.params.score});
    })
    .post(function (req, res) {


        // create reusable transporter object using the default SMTP transport
        //Insert custom smtp server info here
        var transporter = nodemailer.createTransport('');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: req.body.femail, // sender address
            to: req.body.fname, // list of receivers
            subject: req.body.subject, // Subject line
            text: 'i Scored' // plaintext body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
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