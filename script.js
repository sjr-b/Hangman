var defaultWord = ["aba", "abcd"];
var bhs = ["albinson", "henri", "schweng", "zapata", "aperribay", "quiroz", "heffner", "wray", "maaze", "tobias", "becker", "bissell", "barcelos", "halpern", "austera",];
var langEasy= ["english", "spanish", "hindi", "mandarin", "arabic", "swahili", "cherokee"];
var langHard = ["piraha", "guguyimidjir", "wolof", "azerbaijani", "basque", "occitan", "inupiaq", "ainu"];
var word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
var guesses = word.length - 1;
var guessedLetters = [];

// This
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
        applySelection()
    }
    document.getElementById("guessNumber").innerHTML = guesses;
    if (guesses == 0){
        alert("You have lost. The word was " + word + ". The game will now restart.");
        applySelection()
    }

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
    if (category == "defaultWord"){
        word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
        guesses = word.length - 1;
    } else if (category == "bhs"){
        word = bhs[Math.floor(Math.random() * bhs.length)];
        guesses = word.length - 1;
    } else if (category == "langEasy"){
        word = langEasy[Math.floor(Math.random() * langEasy.length)];
        guesses = word.length - 1;
    } else {
        word = langHard[Math.floor(Math.random() * langHard.length)];
        guesses = word.length - 1;
    }
    guessedLetters = [];
    startGame();
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
}

// This function is gives the user the correct answer.
function revealWord(){
    alert("The word was " + word + ". The game will now restart.");
    startGame();
}