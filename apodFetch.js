$(document).ready(function () {
    //$("#view_button").click(getPicture);
    $("#view_button").click(fetchAPOD);
    $("#date").val(new Date().toLocaleDateString('en-CA'));
});


function fetchAPOD() {

    //const postsPromise = fetch('https://api.nasa.gov/planetary/apod?api_key=Xxvggsdti75tDsRskePv3JuA4w6f5oFDdqDv8dQF&date=' + $("#date").val()); // return Promise
    const myPromise = customPromise();
    myPromise
        //.then(thenResponsePromise)
        .then(then2Response)
        .catch(catchError);
}

function customPromise() {
    var url = 'https://api.nasa.gov/planetary/apod?api_key=Xxvggsdti75tDsRskePv3JuA4w6f5oFDdqDv8dQF&date=' + $("#date").val();
    return new Promise(function (xResolve, yReject) {
        
        $.getJSON(url, function (data) {
            xResolve(data);
        });

        // if (true) {
        //     setTimeout( function () {
        //         xResolve("This is true.");
        //     }, 2000)                
        // }
        // else{
        //     yReject("This is false.");
        // }

    });
}

function thenResponsePromise(responsePromise) {
    // After data received
    return responsePromise.json();
}

function then2Response(responseData) {
    // After data received
    //var v = JSON.parse(responseData);//error.
    console.log(responseData) //showPicture
    showPicture(responseData);
}

function catchError(err) {
    // in case rejected
    //console.error(err.message); //noPicture
    noPicture(err);
}


// function fetchAPOD() {
//     const postsPromise = fetch('https://api.nasa.gov/planetary/apod?api_key=Xxvggsdti75tDsRskePv3JuA4w6f5oFDdqDv8dQF'); // return Promise
//     postsPromise.then((responsePromise) => {
//         // After data received
//         //console.log(responsePromise) 
//         return responsePromise.json();
//     })
//     .then((responseData) => {
//         // After data received
//         //var v = JSON.parse(responseData);//error.
//         console.log(responseData) //showPicture
//         showPicture(responseData);
//     })
//     .catch((err)=> {
//         // in case rejected
//         console.error(err); //noPicture
//         noPicture(err);
//     })
// }

// function getPicture() {
//     $.ajax({
//         url: "https://api.nasa.gov/planetary/apod",
//         type: "GET",
//         data: {
//             api_key: "Xxvggsdti75tDsRskePv3JuA4w6f5oFDdqDv8dQF",//"DEMO_KEY",
//             date: $("#date").val()
//         },
//         dataType: "json",
//         "success": showPicture,
//         "error": noPicture
//     });
// };

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