$(document).ready(function() {
    let emptyPosition = { x: 0, y: 0 };
    let cMovablePlace = "movablepiece";
    let divs = [];
    
    $("#shufflebutton").click(shuffleClicked);    

    init(undefined, true);
    function init(skipPosition, initial) {
        $("#puzzlearea div").each(function(index) {
            divs[index] = $(this);

        });

        if (!skipPosition)
            skipPosition = divs.length;

        var x, y;
        let counter = 0;
        let set = new Set();
        let i = 0;

        while (set.size <= divs.length) {

            i = initial ? i : generateRandomNum(divs.length + 1);
            if (set.has(i))
                continue;

            if (skipPosition == i) {
                emptyPosition.x = calculateX(i);
                emptyPosition.y = calculateY(i - 1);
                set.add(i);
                i++;
                console.log(emptyPosition);
                continue;
            }

            const div = divs[counter];
            x = calculateX(i);
            y = calculateY(i);

            div.addClass("puzzlepiece");
            if (initial) {
                placeDiv(div, x, y);
            } else {
                moveDiv(div, x, y);

            }

            div.off("mouseenter").on('mouseenter', function() {
                addMovableHint(div);
            });

            div.off("mouseleave").on('mouseleave', function() {
                removeMovaHint(div);
            });
            div.off('click').on('click', function() {
                moveToBlankSpace(div);

            })
            set.add(i);
            counter++;
            i++;
        }
    }
    
    function calculateX(index) {
        return (index % 4) * 100;
    }
    
    function calculateY(index) {
        return (Math.floor(index / 4) * 100);
    }
    
    function placeDiv(div, x, y) {
        div.css({
            "background-image": "url('./public/background_new.jpg')",
            "background-position": -x + 'px ' + (-y) + 'px'
        });
        moveDiv(div, x, y);
    }

    //reusable
    function moveDiv(div, x, y) {
        div.css({
            "left": x + "px",
            "top": y + "px",
        });

        div.x = x;
        div.y = y;
    }

    function addMovableHint(div) {
        if (isMovable(div)) {
            div.addClass(cMovablePlace);
        }
    }

    function moveToBlankSpace(div) {
        console.log(div);

        if (div.hasClass(cMovablePlace)) {
            let currentEmptyX = emptyPosition.x;
            let currentEmptyY = emptyPosition.y;

            emptyPosition.x = div.x;
            emptyPosition.y = div.y;

            moveDiv(div, currentEmptyX, currentEmptyY);
        }
        console.log(emptyPosition)

    }

    function removeMovaHint(div) {
        div.removeClass(cMovablePlace);
    }

    function isMovable(div) {
        let currentDivPosition = getDivPosition(div);
        let currentEmptyDivPosition = getDivPosition(emptyPosition);
        let probableX = [currentEmptyDivPosition.x, currentEmptyDivPosition.x + 1, currentEmptyDivPosition.x - 1];
        let probableY = [currentEmptyDivPosition.y, currentEmptyDivPosition.y + 1, currentEmptyDivPosition.y - 1];

        let isCurrentDivEven = (currentDivPosition.x + currentDivPosition.y) % 2 == 0;
        let isEmptyDivEven = (currentEmptyDivPosition.x + currentEmptyDivPosition.y) % 2 == 0;
        let isCrossValid = isCurrentDivEven == isEmptyDivEven;

        if (probableX.indexOf(currentDivPosition.x) > -1 && probableY.indexOf(currentDivPosition.y) > -1 &&
            ((currentEmptyDivPosition.x == currentDivPosition.x || currentEmptyDivPosition.y == currentDivPosition.x || currentDivPosition.y == currentEmptyDivPosition.y)) &&
            !isCrossValid
        )
        return true;

    }
    
    function getDivPosition(div) {
        let x = parseInt(div.x) / 100;
        let y = parseInt(div.y) / 100;
        return { x: x, y: y };
    }

    function shuffleClicked() {
        reset();
        let randomNum = generateRandomNum(15);
        init(randomNum, false);
    }

    function reset() {
        divs = [];
        emptyPosition = { x: 0, y: 0 };
    }

    function generateRandomNum(n) {
        return parseInt(Math.random() * n)
    }

});


// $(document).ready(function () {
//     var v = $('#puzzlearea div');
//     $('#puzzlearea div').each(function (i, element) {
//         var x = ((i % 4) * 100);
//         var y = (Math.floor(i / 4) * 100);

//         $(element).addClass('puzzlepiece');//can us 'this'
//         $(element).css('left', x + 'px');
//         $(element).css('top', y + 'px');
//         $(element).css('background-image', 'url("./public/background.jpg")');
//         $(element).css('background-position', -x + 'px ' + -y + 'px');

//         // store x and y for later        
//         $(element).prop('x', x);
//         $(element).prop('y', y);
        
//     })
// });
