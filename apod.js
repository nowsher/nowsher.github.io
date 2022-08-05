$(document).ready(function () {
    $("#view_button").click(getPicture);
    //$("#date").val(new Date());
    //$('#date').val('2022-03-22');
    $("#date").val(new Date().toLocaleDateString('en-CA'));
});

function getPicture() {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        type: "GET",
        data: {
            api_key: "Xxvggsdti75tDsRskePv3JuA4w6f5oFDdqDv8dQF",//"DEMO_KEY",
            date: $("#date").val()
        },
        dataType: "json",
        "success": showPicture,
        "error": noPicture
    });
};

function showPicture(data) {
    $("#pic").attr("src", data.url);
    $("#explanation").text(data.explanation);
    $("#title").text(data.title);
};

function noPicture(error) {
    alert(error.responseText);
};