//CSS script for maths game
var playing = false;
var timeremaining = 60;
var countdown;
var correctAns;

document.getElementById("startReset").onclick = function () {
    //if we are playing
    if (playing == true) {
        location.reload(); //reload a page
    } else {
        //if we are not playing the game
        //change the mode to playing
        playing = true;

        //hide the game over screen
        hide("gameOver");

        //set score to 0
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

        show("timeRemaining");
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

        //change button text to reset game
        document.getElementById("startReset").innerHTML = "Reset Game";

        //start countdown
        startCountdown();

        //start showing questions and answers(lets play the game)
        generateQA();
    }
}

for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        //check if we are playing or not
        if (playing == true) {
            if (this.innerHTML == correctAns) {
                //checks answer is clicked

                //increase the score by 1
                score++;
                document.getElementById("scoreValue").innerHTML = score;

                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                generateQA();
            } else {
                //you clicked  wrong ans
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAns = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());

    document.getElementById("box" + correctPosition).innerHTML = correctAns; //fill one of the box with correct ans

    var answers = [correctAns];
    //fill other boxes with wrong nswer
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random()) + 1 + Math.round(9 * Math.random())); //a wrong answer
            } while (answers.indexOf(wrongAnswer) > -1);
            //while(wrongAnswer == correctAns)
            //this may generate multiple same wrong ans

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

function startCountdown() {
    countdown = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeRemainingValue").innerHTML = timeremaining;
        if (timeremaining == 0) { //stop the game
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p> <p>Your Score is" + score + ".";
            hide("timeRemaining");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdown);
}

//show an element with specific id
function show(id) {
    document.getElementById(id).style.display = "block";
}
//hide an element with specific id
function hide(id) {
    document.getElementById(id).style.display = "none";
}