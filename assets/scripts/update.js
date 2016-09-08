/**
 * Created by George on 2016-09-06.
 */
//Global counter variable that keeps track of the number of courses watched.
var counter = 0;

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
};

function createWatch(courseCode, lectureSection){
    counter++;
    var $row= $("<div/>",{
            class:"row"
    });

    var $course = $("<div/>",{
        id:"course" + counter,
        class:"course",
        text: courseCode
    });
    var $lecture = $("<div/>",{
        id:"lecture" + counter,
        class:"lecture",
        text: lectureSection
    });
    var $enrollment= $("<div/>",{
        id:"enrollment" + counter,
        class:"enrollment"
    });
    var $total = $("<div/>",{
        id:"total" + counter,
        class:"total"
    });
    $row.append($course, $lecture, $enrollment, $total);
    $("#payload").append($row);
}

//Function to update the courses watched.
function update(){
    //For each course currently watched, go and do an api call to updatet he numbers.
    //Ajax call based on course code.
    $.ajax({
        url:"https://cobalt.qas.im/api/1.0/courses/search?q=CSC207H1F&key=2xc4LW5TDnZqa0qjdx8nQoyCMskuN8NU",
        type:"GET",
        dataType:"json"
    }).done(function(data){
        console.log(data);
    });
};

function add(){
    createWatch($("#courseCode").val(),$("#lectureSection").val());
    //Call cancel to toggle
    cancel();
}

//Remove the input row and show the add courses again.
function cancel(){
    $("#addCourse").toggle('show');
    $("#inputRow").remove();
}

function addCourse(){
    //Creating input row wrapper.
    var $input= $("<div/>",{
        id:"inputRow",
        class:"row"
    });

    //Create input for course/lecture/confirm/cancel button.
    var $course = $("<input/>",{
        type:"text",
        name:"courseCode",
        id:"courseCode",
        placeholder:"Course Code"
    });
    var $lecture=$("<input/>",{
        type:"text",
        name:"section",
        id:"lectureSection",
        placeholder:"Lecture section"
    });
    var $confirm=$("<button/>",{
        onclick:"add()",
        text:"Add"
    });
    var $cancel=$("<button/>",{
        onclick:"cancel()",
        text:"Cancel"
    });
    //Append to input before appending to payload
    $input.append($course);
    $input.append($lecture);
    $input.append($confirm);
    $input.append($cancel);
    $("#payload").append($input);

    //Toggle visibility so they can't add multiple courses?
    //ISSUE: Maybe need a cancel?
    //ISSUE: Maybe do a cap instead?
    $("#addCourse").toggle('show');
    

}

$(document).ready(function(){
    counter = 1; //To account for csc207h1f
   //update();
});