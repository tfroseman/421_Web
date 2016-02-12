
function createTableofContents(){
    // WHY IS THE PAGE LOADED IN AN IFRAME!?!?!?!?
    //TODO Eveything is in one line
    //TODO the last element is double diplayed.
    //TODO All links are at the bottom of the page.
    //
    //An array of all the headings from the page
    //var iframe = document.getElementById('cframe');
    //var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var innerDoc = document;
    var headings = innerDoc.getElementsByTagName("h1");
    var anchor = document.createElement("a");
    var paragraph = document.createElement("p");


    //For each item insert a new link in the page that points to the heading href #
    for (var i = 0; i < headings.length; i++) {
        anchor = document.createElement("a");
        paragraph = document.createElement("p");
        anchor.setAttribute("href", "#"+headings[i].nextSibling.nextSibling.id);
        anchor.innerHTML = (i+1).toString() + " " + headings[i].innerHTML;
        paragraph.appendChild(anchor);
        console.log(paragraph);
        innerDoc.body.insertBefore(paragraph ,innerDoc.getElementById("contents"));
}
}
