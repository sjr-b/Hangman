/*

Global variables (variables that are declared outside of a function):
word - string (according to Gabe when it is selecting every time?)
words - array
guesses - number
guessedLetters - array
*/
var defaultWord = ["ab", "abc", "abcd"];
var bhs = ["albinson", "henri", "schweng", "zapata", "aperribay", "quiroz", "heffner", "wray", "maaze", "tobias", "becker", "bissell", "barcelos", "halpern"];
var langEasy= [];
var langHard = [];
var word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
var guesses = word.length - 1;
var guessedLetters = [];

// Reset the board, clear out any traces of the last round from guessedLetters
// Choose a word - this code will grab  a random element from your words array for you:
// var rand = myArray[Math.floor(Math.random() * myArray.length)];
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
    var result = printWord()
    document.getElementById("word").innerHTML = result;
    if (result == word){
        alert("Congratulations");
    }
    document.getElementById("guessNumber").innerHTML = guesses;
    if (guesses == 0){
        alert("You have lost!");
        document.getElementById("letter").disabled = true;
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
        guesses--;
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
    word = category[Math.floor(Math.random() * category.length)];
}