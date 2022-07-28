
$(document).ready(function () {

    var started = false;
    var outoffTrack = false;
    
    $("#start").click(function (params) {
        $(".boundary").removeClass("youlose");
        started = true;
        outoffTrack = false;

        $("h2#status").text("Game started...");        
    });

    $(".boundary").mouseover(function (params) {
        if (started) {
            $(this).addClass("youlose");
            outoffTrack = true;
        }
    });

    $("#end").click(function (params) {
        if (started && !outoffTrack) {
            $("h2#status").text("You win! :]");
            alert("You win! :]")
        }
        else if (started && outoffTrack) {
            $("h2#status").text("Sorry, You lost. :[");
            alert("Sorry, You lost. :[")
        }
        started = false;
    });

    $("#maze").mouseleave(function (params) {
        if (started) {
            $(".boundary").addClass("youlose");
            $("h2#status").text("You lose.");
            outoffTrack = true;   
        }
    });


});