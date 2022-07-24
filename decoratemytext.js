// alert("Hello, world!");

var timer = null;

function executeTimer(currentFontSize) {
    if (timer == null) {
        timer = setInterval(() => {
            increaseFont();
        }, 500);
    }
    else {
        clearInterval(timer);
        timer = null;
    }
}

function increaseFont() {
    var textbox = document.getElementById("writeText");
    var size = window.getComputedStyle(textbox, null).getPropertyValue('font-size');
    var fontSize = parseFloat(size);
    textbox.style.fontSize = fontSize + 2 + "px";
}

function changeBigger() {
    // alert("Hello, world!");
    //var textbox = document.getElementById("writeText");
    //textbox.style.fontSize = "24pt";

    //var v = $("writeText").attr("fontSize");//do not work.
    executeTimer();
}

function changeBling(chk) {
    var textbox = document.getElementById("writeText");
    var checkBox = document.getElementById("bling");
    if (checkBox.checked) {
        textbox.style.fontWeight = "bold";
        textbox.style.color = "green";
        textbox.style.textDecoration = "underline";
        document.body.style.backgroundImage = "url('./public/dollarImg.jpg')";
    }
    else {
        textbox.style.fontWeight = "normal";
        textbox.style.color = "black";
        textbox.style.textDecoration = "none";
        document.body.style.backgroundImage = "";
    }
}

function igpay() {
    var textbox = document.getElementById("writeText");
    textbox.style.fontFamily = "Pig Latin";

    var text = textbox.value;
    document.getElementById("writeText").value = "";
    var array = text.split(" ");
    array.forEach((element, index) => {
        var pos = -1;
        for (let index = 0; index < element.length; index++) {
            if (element.charAt(index).toLowerCase() === "a" || element.charAt(index).toLowerCase() === "e" || element.charAt(index).toLowerCase() === "i" ||
                element.charAt(index).toLowerCase() === "o" || element.charAt(index).toLowerCase() === "u") {

                pos = index;
                break;
            }

        }

        var newStr = "";
        if (pos > 0) {
            var start = element.slice(0, pos);
            var end = element.slice(pos);
            newStr = end + start + "-ay";
        }
        else if (pos == 0) {//if  begin with voules.
            newStr = element+ "-ay";
        }
        document.getElementById("writeText").value += (document.getElementById("writeText").value != "" ? " " : "") + newStr;
    });
}


function malkovitch() {
    var text = document.getElementById("writeText").value;
    document.getElementById("writeText").value = "";

    var array = text.split(" ");
    array.forEach((element, index) => {
        if (element.length >= 5) {
            element = "Malkovich";
            array[index] = element;
        }
        document.getElementById("writeText").value += (document.getElementById("writeText").value != "" ? " " : "") + element;
    });
}