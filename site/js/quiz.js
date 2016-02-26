//Generate guid for users. Will allow for almost limitless user ids
function generateUUID() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function next_page() {
    var current_page = sessionStorage.getItem('page');
    var next_page = parseInt(current_page, 10) + 1;
    var quiz_window = parent.document.getElementById("cframe").contentWindow;

    if (next_page <= 10) {
        quiz_window.location = "/EvalTool/quiz/question" + next_page;
        sessionStorage.setItem('page', next_page);
        document.getElementById('previous').style.visibility = 'visible';
    }else{
        document.getElementById('next').style.visibility = 'hidden';
    }
}

function previous_page() {
    var current_page = sessionStorage.getItem('page');
    var previous_page = parseInt(current_page, 10)-1;
    var quiz_window = parent.document.getElementById("cframe").contentWindow;

    if(previous_page >= 1) {
        quiz_window.location = "/EvalTool/quiz/question" + previous_page;
        sessionStorage.setItem('page', previous_page);
        document.getElementById('next').style.visibility = 'visible';
    }else{
        document.getElementById('previous').style.visibility = 'hidden';
    }
}

function start() {
    var uuid = generateUUID();
    sessionStorage.setItem('uui', uuid);
    sessionStorage.setItem('page', 0);

    document.getElementById('start').style.visibility = 'hidden';
}

function submit() {
    $.ajax({
        method: 'POST',
        url: '/EvalTool/quiz',
        data:{
            'answers':
         [
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
        ]},

        success: function (response) {
            document.getElementById('score').innerHTML = 'Your score is ' + response.score + '/10';
            sessionStorage.setItem('score', response.score);
        }
    });
}

function email() {
    var quiz_window = parent.document.getElementById("cframe").contentWindow;
    quiz_window.location = "/EvalTool/email/" + sessionStorage.getItem('score');
}
