/**
 * Created by thomasroseman on 1/29/16.
// <-----------OLD CODE--------------------------------->
function clock(){
    //Get new date object
    var date = new Date();

    //assign hours and minutes
    var hour = date.getHours() - 12;
    var minute = date.getMinutes();
    var seconds = date.getSeconds();


    //update each element
    document.getElementById("hour").innerHTML = hour.toString();
    document.getElementById("minute").innerHTML = minute.toString();
    document.getElementById("second").innerHTML = seconds.toString();

    //assign am or pm based on 24hr clock
    if(date.getHours() > 12) {
        document.getElementById("ampm").innerHTML = "pm";
    }else{
        document.getElementById("ampm").innerHTML = "am";
    }

    //rotate the clock hands
    //document.getElementById("hourhand").style.transform = "rotate("+360/12*hour+"deg)";
    //document.getElementById("minutehand").style.transform = "rotate("+360/60*minute+"deg)";
    //document.getElementById("secondhand").style.transform = "rotate("+360/60*seconds+"deg)";

    //call clock() after 1sec and allow the previous call to finish.
    setTimeout(clock, 1000);
}
*/

function updateTime() { // Update the SVG clock graphic to show current time
    var now = new Date();                       // Current time
    var min = now.getMinutes();                 // Minutes
    var hour = (now.getHours() % 12) + min/60;  // Fractional hours
    var minangle = min*6;                       // 6 degrees per minute
    var hourangle = hour*30;                    // 30 degrees per hour

    // Get SVG elements for the hands of the clock
    var minhand = document.getElementById("minutehand");
    var hourhand = document.getElementById("hourhand");

    // Set an SVG attribute on them to move them around the clock face
    minhand.setAttribute("transform", "rotate(" + minangle + ",50,50)");
    hourhand.setAttribute("transform", "rotate(" + hourangle + ",50,50)");

    // Update the clock again in 1 minute
    setTimeout(updateTime, 60000);
}