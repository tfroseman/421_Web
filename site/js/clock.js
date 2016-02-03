/**
 * Created by thomasroseman on 1/29/16.
 */
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
    document.getElementById("hourhand").style.transform = "rotate("+360/12*hour+"deg)";
    document.getElementById("minutehand").style.transform = "rotate("+360/60*minute+"deg)";
    document.getElementById("secondhand").style.transform = "rotate("+360/60*seconds+"deg)";

    //call clock() after 1sec and allow the previous call to finish.
    setTimeout(clock, 1000);
}
