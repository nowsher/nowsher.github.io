"use strict";
window.onload = pageLoad;

class Animation{
    static cSpeed = 250;
    static intervalId = null;
    
    constructor(){
       this.animArray = [];
       this.animIndex = 0;    
    }

    setAnimationText(text) {
        this.animArray = text.split('=====\n');
    }

    startAnimation(animation, animationArea) {        
        Animation.intervalId = setInterval(function () {
            if (animation.animIndex === animation.animArray.length) {
                animation.animIndex = 0;
            }
            animationArea.value = animation.animArray[animation.animIndex++];
        }, Animation.cSpeed);
    }

    stopAnimation() {
        if (Animation.intervalId){
            clearInterval(Animation.intervalId);
        }
        Animation.intervalId = null;
    }    
    
    resetSpeed() {
        Animation.cSpeed = 250;
    }

    setTurbo() {
        Animation.cSpeed = 50;
    }

    isAnimationRunning() {
         return (Animation.intervalId != null) ? true : false;
     }

}

var animation = null;

function pageLoad() {    
    animation = new Animation();

    document.getElementById("controlSize").onchange = sizeChanged;
    document.getElementById("controlAnimation").onchange = animationChanged;
    document.getElementById("turboChk").onclick = speedChanged;
    
    document.getElementById("btnStart").onclick = start;
    document.getElementById("btnStop").onclick = stop;
}

function start() {    
    if (animation==null) {
        alert("Page not loaded properly. Please refresh.");
    }
    var mainTextArea = document.getElementById("maintxt");
    if (mainTextArea.value == null || mainTextArea.value == "") {
        return;
    }
    toggleinteractability(true);
    animation.setAnimationText(mainTextArea.value);
    animation.startAnimation(animation, mainTextArea);
}

//Stop and reset
function stop() {
    toggleinteractability(false);
    animation.stopAnimation();
    var selectedIndex = document.getElementById("controlAnimation").selectedIndex;
    var text = document.getElementById("controlAnimation").options[selectedIndex].text;
    document.getElementById("maintxt").value = ANIMATIONS[text];//set default data
}

// Enable, Disable controls.
function toggleinteractability(isStarted) {
    document.getElementById("btnStart").disabled = isStarted ? true : false;
    document.getElementById("btnStop").disabled = isStarted ? false : true;
    document.getElementById("controlAnimation").disabled = isStarted ? true : false;
}

var sizeChanged = function (e) {
    let selectedValue = e.currentTarget.value;    
    document.getElementById("maintxt").style.fontSize = selectedValue;
}

//Change animation type/text
var animationChanged = function (e) {
    let selectedValue = e.currentTarget.value;
    document.getElementById("maintxt").value = ANIMATIONS[selectedValue];
}

//Change global value of currentspeed upon changes
var speedChanged = function (e) {
    if (e.currentTarget.checked) {
        animation.setTurbo();
        if (animation.isAnimationRunning()) {
            animation.stopAnimation();
            animation.startAnimation(animation, document.getElementById("maintxt"));
        }
    } else {
        animation.resetSpeed();
        if (animation.isAnimationRunning()) {
            animation.stopAnimation();
            animation.startAnimation(animation, document.getElementById("maintxt"));
        }
    }
}