
function generateRandomWord() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let word = '';
    for (let i = 0; i < 5; i++) {
        word += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return word;
}


$(document).ready(function () {
    const RANDOM_WORD = generateRandomWord();
    document.getElementById('targetWord').textContent = RANDOM_WORD;

    $(".draggable").on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text/plain', event.target.textContent);
    });

    for (let i = 0; i < 5; i++) {
        let $box = $('<div>').addClass('box').attr('id', 'box' + i);
        $('#boxesArea').append($box);
        if (!window.stopAnimation) { animateBox($box); }
    }

    setTimeout(function () {
        $(".box").on("dragover", function (event) {
            event.preventDefault();
        });

        $(".box").on("drop", function (event) {
            event.preventDefault();
            let letter = event.originalEvent.dataTransfer.getData('text/plain');
            $(this).text(letter);
            updatePentagramDisplay();
        });
    }, 100);

    function animateBox($box) {
        let newLeft = Math.random() * ($('#boxesArea').width() - $box.width());
        let newTop = Math.random() * ($('#boxesArea').height() - $box.height());

        $box.animate({
            left: newLeft,
            top: newTop
        }, 2000, function () {
            if (!window.stopAnimation) { animateBox($box); }
        });
    }

    function updatePentagramDisplay() {
        let sortedBoxes = $('.box').sort(function (a, b) {
            return $(a).position().left - $(b).position().left;
        });

        let text = '';
        sortedBoxes.each(function () {
            text += $(this).text();
        });

        $('#pentagramDisplay').text(text);

        if (text.length === 120) {
            window.stopAnimation = true; $(".box").stop(true);
            $('.box').css('background-color', 'white');
            $('.box').css('height', 'auto');
            $('.box').css('width', 'auto');



            if (text === RANDOM_WORD) {
                $('.box').css('color', 'green');

                document.getElementById("continueButton").style.display = "block";
            } else {
                $('.box').css('color', 'red');


                document.getElementById("tryAgainButton").style.display = "block";
            }
        }
    }
});


$(document).on("click", "#tryAgainButton", function () { location.reload(); });
