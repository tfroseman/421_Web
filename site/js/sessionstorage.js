/**
 * Created by Andy on 2/16/2016.
 * Updated: 2/16/14
 * Purpose: Store a users quiz answers and restore their answer to the correct radio-button
 *          after navigating either forward or back. And posts the data to server.
 */

//Session Storage(client side) function
var radios = document.getElementsByName("q"); //list of radio buttons
var radio_location; //used to store the index of the checked radio button
var question_id = document.getElementById("question_block").children[0].id;


/**
 * On moving a page store the user value
 */
var score;
function store_answer() {
    //Move through the radio buttons
    for (var i = 0; i < radios.length; i++) {
        //Check if one if checked
        if (radios[i].checked == true) {
            //If checked store that as the users answer
            sessionStorage.setItem(question_id, radios[i].value);
        }
    }
}

/**
 * If values are stored locally repopulate them and display as needed
 */
function restore_answer() {
    var selected = sessionStorage.getItem(question_id);
    if (selected != undefined) {
        radios[selected - 1].checked = true;
    }
}


//Post data to server function
function send_answers() {
    var data = {
        "answers": [
            sessionStorage.getItem('q1'),
            sessionStorage.getItem('q2'),
            sessionStorage.getItem('q3'),
            sessionStorage.getItem('q4'),
            sessionStorage.getItem('q5'),
            sessionStorage.getItem('q6'),
            sessionStorage.getItem('q7'),
            sessionStorage.getItem('q8'),
            sessionStorage.getItem('q9'),
            sessionStorage.getItem('q10')
        ]
    };

    var request = new XMLHttpRequest();
    request.open("POST", "/EvalTool/quiz");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
    //console.log(JSON.parse(request.responseText));

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            score = JSON.parse(request.responseText);
            document.getElementById('user_score').innerHTML = score.score + "/10";
            document.getElementById('email').setAttribute("href", "/EvalTool/email/" + score.score);
        }
    };

}


function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function prep_for_post() {
    post('/EvalTool/email', [
        sessionStorage.getItem('question1'),
        sessionStorage.getItem('question2'),
        sessionStorage.getItem('question3'),
        sessionStorage.getItem('question4'),
        sessionStorage.getItem('question5'),
        sessionStorage.getItem('question6'),
        sessionStorage.getItem('question7'),
        sessionStorage.getItem('question8'),
        sessionStorage.getItem('question9'),
        sessionStorage.getItem('question10')
    ], 'post');
}



