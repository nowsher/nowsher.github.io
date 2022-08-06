$(document).ready(function () {
    $("#view_button").click(fetchAPOD);
    $("#date").val(new Date().toLocaleDateString('en-CA'));
});

function fetchAPOD() {
    const postsPromise = fetch('https://api.nasa.gov/planetary/apod?api_key=Xxvggsdti75tDsRskePv3JuA4w6f5oFDdqDv8dQF&date=' + $("#date").val()); // return Promise
    postsPromise.then((responsePromise) => {
        // After data received
        //console.log(responsePromise) 
        return responsePromise.json();
    })
    .then((responseData) => {
        // After data received
        //var v = JSON.parse(responseData);//error.
        console.log(responseData) //showPicture
        showPicture(responseData);
    })
    .catch((err)=> {
        // in case rejected
        console.error(err); //noPicture
        noPicture(err);
    })
}

function showPicture(data) {
    $("#pic").attr("src", data.url);
    $("#explanation").text(data.explanation);
    $("#title").text(data.title);
};

function noPicture(error) {
    if (error.responseText) {
        alert(error.responseText);
    }
    else if (error.message) {
        alert(error.message);
    }

};