$(document).ready(function() {

    // the list of game words
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
    var guessesRemaining = 5;
    var wins = 0;
    var losses = 0;
    var guessesStart = 5

    // starts a new game
    function newGame() {

        // resets the variables
        guessesRemaining = guessesStart;
        lettersCorrectlyGuessed = [];
        lettersGuessed = [];
        answerArray = [];
        
        // randomly selects a word for the new game
        gameWord = words[Math.floor(Math.random() * words.length)];

        // splits the selected word into an array comprised of each character as a separate item
        correctLetters = gameWord.split("");

        // populates the answerArray with blank spaces
        for (var i = 0; i < correctLetters.length; i++) {
            answerArray[i] = "_";
        }

        // changes the background image to the image that corresponds with the game word
        $("body").css("background-image", `url("assets/images/${gameWord}.jpg")`);

    }

    // looks at the key the player enters, determines if it is valid, and compares it to the correctLetters array
    function singlePlay(userGuess) {

        var playableKey = false;

        // array of acceptable keys a user can enter
        var playOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
                           "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; 

        // Compares the userGuess to the playable keys to determine if the key is playable.  
        for (var i = 0; i < playOptions.length; i++) {
            if (userGuess === playOptions[i]) {
                playableKey = true;
            }
        }

        // Compares the userGuess to letters they have already guessed so they cannot guess the same letter twice
        for (var j = 0; j < lettersGuessed.length; j++) {
            if (userGuess === lettersGuessed[j]) {
                playableKey = false;
            }
        }

        // If the userGuess is valid, run it through the game play
        if (playableKey) {
            correctAnswer = false;

            // adds the userGuess to the array of the letters they have already guessed
            lettersGuessed.push(userGuess);

            // compares the userGuess to the correct letters
            for (var i = 0; i < correctLetters.length; i++) {
            
                // if the userGuess is one of the correct letters, include it in the letters correctly guessed array
                // and display it in the answerArray.  
                if (userGuess === correctLetters[i]) {
                    correctAnswer = true;
                    answerArray[i] = userGuess;
                    lettersCorrectlyGuessed.push(userGuess);
                }
            }

            // if the userGuess was incorrect, decrease the guesses remaining by 1
            if (correctAnswer) {
                guessesRemaining = guessesRemaining;
            } else {
                guessesRemaining = guessesRemaining - 1;
            }
        }
    }

    // Determines if the game has been won, lost or should continue
    function determineNextPlay() {

        // compares the correct guesses to the correct letters.  If they match, the game is won and a new game is started
        if(lettersCorrectlyGuessed.length === correctLetters.length) {
            console.log("You won!!!");
            wins++;
            newGame();

        // if they have not won, look at the number of guesses remaining to see if they lost the game or if the play should continue
        } else if (guessesRemaining === 0) {
            console.log("You lost.");
            losses++;
            newGame();
        } 
    }

    // Displays the game stats on the page
    function displayStats() {

        $("#game-stats").html(
            "<h3>Guesses Left: " + guessesRemaining + "</h3>" +
            "<h3>Wins: " + wins + "</h3>" +
            "<h3>Losses: " + losses + "</h3>"
            );
    }

    // displays the game play on the page
    function displayGame() {
        
        var guessesDisplay = "";

        // Adds the letters guessed display
        for (var i = 0; i < lettersGuessed.length; i++) {
            guessesDisplay = lettersGuessed[i] + " " + guessesDisplay;
        }

        // creates a <p> element with the guesses
        var guessesP = $("<p>" + guessesDisplay + "</p>");

        // replaces the guesses-div with the <p> element of the guesses
        $("#guesses-div").html(guessesP);

        // creates a <p> element for the progress
        var progressP = $("<p>" + answerArray.join(" ") + "</p>");
        
        // displays the progress on the page
        $("#progress").html(progressP);

    }

    // Start a new game when the page loads
    newGame();

    // When the user enters a key, store that key and start playing the game
    document.onkeyup = function(event) {
        
        // Change the instructions from how to start to "You've Guessed:"
        $("#instructions").text("You've Guessed:");

        var userGuess = event.key.toLowerCase();
        
        // Check that the key is valid and if it matches a letter in the game word
        singlePlay(userGuess);
        
        // after the play is run, determine if the game was won or lost
        determineNextPlay();

        // display the game stats
        displayStats();

        // display the game board
        displayGame();

    }
});