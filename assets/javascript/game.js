$(document).ready(function() {

    var words = [
        "yosemite",
        "glacier",
        "everglades",
        "canyonlands",
        "acadia",
        "arches",
        "badlands",
        "biscayne",
        "congaree",
        "denali"
    ];

    var gameWord = "";
    var correctLetters = [];
    var answerArray = [];
    var correctAnswer = false;
    var lettersCorrectlyGuessed = [];
    var lettersGuessed = [];
    var guessesRemaining = 3;
    var wins = 0;
    var losses = 0;


    function newGame() {

        guessesRemaining = 3;
        lettersCorrectlyGuessed = [];
        lettersGuessed = [];
        answerArray = [];
        
        // randomly select a word for the new game
        gameWord = words[Math.floor(Math.random() * words.length)];

        // splits the selected word into an array comprised of each character as a separate item
        correctLetters = gameWord.split("");

        for (var i = 0; i < correctLetters.length; i++) {
            answerArray[i] = "_";
        }

        $("body").css("background-image", `url("assets/images/${gameWord}.jpg")`);

    }

    function singlePlay(userGuess) {

        var playableKey = false;

        var playOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
                           "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; 

        for (var i = 0; i < playOptions.length; i++) {
            if (userGuess === playOptions[i]) {
                playableKey = true;
            }
        }

        for (var j = 0; j < lettersGuessed.length; j++) {
            if (userGuess === lettersGuessed[j]) {
                playableKey = false;
            }
        }

        if (playableKey) {
            correctAnswer = false;
            lettersGuessed.push(userGuess);

            for (var i = 0; i < correctLetters.length; i++) {
            
                if (userGuess === correctLetters[i]) {
                    correctAnswer = true;
                    answerArray[i] = userGuess;
                    lettersCorrectlyGuessed.push(userGuess);
                }
            }

            if (correctAnswer) {
                guessesRemaining = guessesRemaining;
            } else {
                guessesRemaining = guessesRemaining - 1;
            }

            newKey = false;
        }

    }

    function determineNextPlay() {

        if(lettersCorrectlyGuessed.length === correctLetters.length) {
            console.log("You won!!!");
            wins++;
            newGame();

        } else if (guessesRemaining === 0) {
            console.log("You lost.");
            losses++;
            newGame();

        } 
    }

    function displayStats() {
        $("#game-stats").html(
            "<h3>Guesses Left: " + guessesRemaining + "</h3>" +
            "<h3>Wins: " + wins + "</h3>" +
            "<h3>Losses: " + losses + "</h3>"
            );
    }

    function displayGame() {
        
        var guessesDisplay = "";

        for (var i = 0; i < lettersGuessed.length; i++) {
            guessesDisplay = lettersGuessed[i] + " " + guessesDisplay;
        }

        var guessesP = $("<p>" + guessesDisplay + "</p>");

        $("#guesses-div").html(guessesP);

        var progressP = $("<p>" + answerArray.join(" ") + "</p>");
        
        $("#progress").html(progressP);

    }

    // Start a new game when the page loads
    newGame();

    // When the user enters a key, store that key and start playing
    document.onkeyup = function(event) {
        var userGuess = event.key.toLowerCase();
        
        // run the singlePlay function to make sure the key is valid and if it matches a letter in the game word
        singlePlay(userGuess);
        
        // after the play is run, determine if the game was won or lost
        determineNextPlay();

        displayStats();
        displayGame();

        console.log(guessesRemaining);
        console.log(lettersCorrectlyGuessed);
        console.log(gameWord);
        console.log(answerArray);
        

    }
});