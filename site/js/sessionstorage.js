/**
 * Created by Andy on 2/16/2016.
 * Updated: 2/16/14
 * Purpose: Store a users quiz answers and restore their answer to the correct radio-button
 *          after navigating either forward or back. And posts the data to server.
 */

//Session Storage(client side) function
var radios = document.getElementsByName("q"); //list of radio buttons
var radio_location; //used to store the index of the checked radio button
var forms = document.getElementsByTagName("form"); //gets form name as an array

/**
 * On moving a page store the user value
 */
function store_answer() {
    //Move through the radio buttons
    for (var i = 0; i < radios.length; i++) {
        //Check if one if checked
        if (radios[i].checked == true) {
            //If checked store that as the users answer
            sessionStorage.setItem(forms[0].id, radios[i].value);
        }
    }
}

/**
 * If values are stored locally repopulate them and display as needed
 */
function restore_answer() {
    var selected = sessionStorage.getItem(forms[0].id);
    radios[selected-1].checked = true;
}


//Post data to server function
function post() {

}



