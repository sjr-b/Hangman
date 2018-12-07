var hangmanImages = ["https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png", "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png", "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png", "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png", "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png"];
var defaultWord = ["pear", "apple"/*, "strawberry", "durian", "orange", "starfruit"*/];
var bhs = ["albinson", "henri", "schweng", "zapata", "aperribay", "quiroz", "heffner", "wray", "maaze", "tobias", "becker", "bissell", "barcelos", "halpern", "austera",];
var langEasy= ["english", "spanish", "hindi", "mandarin", "arabic", "swahili", "cherokee"];
var langHard = ["aymara", "guguyimidjir", "wolof", "azerbaijani", "basque", "occitan", "inupiaq", "ainu", "liki"];
var word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
var guesses = guessNumber();
var guessedLetters = [];

// This is the starting function.
function startGame(){
    document.getElementById("guessNumber").innerHTML = guesses;
    document.getElementById("word").innerHTML = printWord();
}

// Take the most recently guessed letter and validate it, re-print the word, deduct from guesses,
// check to see if the user has won or lost yet.
function guessLetter(){
    var letter = document.getElementById("letter").value;
    document.getElementById("letter").options[matchValueToPosition(letter)].disabled = true;
    guessedLetters.push(letter);
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    var result = printWord();
    document.getElementById("word").innerHTML = result;
    if (result == word){
        alert("Congratulations, you have won! The game is now going to reset.");
        applySelection();
    }
    document.getElementById("guessNumber").innerHTML = guesses;
    if (guesses == 0){
        alert("You have lost. The word was " + word + ". The game will now restart.");
        applySelection();
    }
    var picture = document.createElement("img");
    picture.setAttribute("src", giveImage());
    document.getElementById("image").appendChild(picture);
}

// Compare word to guessedLetters using guessedLetters.indexOf(letter in word) to
// build the “_” word with the correctly guessed letters filled in.
function printWord(){
    var wordProgress = "";
    if (guessedLetters.length != 0){
        for (var a = 0; a < word.length; a++){
            for (var c = 0; c < guessedLetters.length; c++){
                if (guessedLetters[c] == word[a]){
                    wordProgress += guessedLetters[c];
                }
                if (wordProgress == word){
                    return wordProgress;
                }
            }
            if (wordProgress.length - 1 != a){
                wordProgress += "_";
            }
        }
        if (document.getElementById("word").innerHTML == wordProgress){
            guesses--;
        }
    } else {
        for (var b = 0; b < word.length; b++){
            wordProgress += "_";
        }
    }
    return wordProgress;
}

// This function matches a letter to its position in the alphabet so that the letter selection box can be disabled when a letter has been guessed.
function matchValueToPosition(letter){
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var b = 0; b < 26; b++){
        if (letter == alphabet[b]){
            return b;
        }
    }
}

// This function applies the student's choice to change what the word is (so it's not the default).
function applySelection(){
    var category = document.getElementById("categories").value;
    if (category == "bhs"){
        word = bhs[Math.floor(Math.random() * bhs.length)];
        guesses = guessNumber();
    } else if (category == "langEasy"){
        word = langEasy[Math.floor(Math.random() * langEasy.length)];
        guesses = guessNumber();
    } else if (category == "langHard"){
        word = langHard[Math.floor(Math.random() * langHard.length)];
        guesses = guessNumber();
    } else {
        word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
        guesses = guessNumber();
    }
    for (var a = 0; a < 26; a++){
        document.getElementById("letter").options[a].disabled = false;
        document.getElementById("letter").options[a].selected = false;
    }
    guessedLetters = [];
    startGame();
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
}

// This function is gives the user the correct answer.
function revealWord(){
    alert("The word was " + word + ". The game will now restart.");
    applySelection();
}

// This function determines the number of possible guesses.
function guessNumber(){
    if (word.length >= 6){
        return 6;
    } else if (2 < word.length - 1 && word.length - 1 <= 4){
        return 4;
    } else {
        return 2;
    }
}

// This function puts images into the guess box to indicate the number of guesses left.
function giveImage(){
    var defaultGuess = guessNumber();
    if (guesses != defaultGuess){ // this way there is only an image if there have been any wrong guesses.
        if (guesses == 5){
            return hangmanImages[0];
        }
    }
}